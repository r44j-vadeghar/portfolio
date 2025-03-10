// src/components/store/ClientBasket.tsx
"use client";

import Loader from "@/components/Loader";
import AddToBasketButton from "@/components/store/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ACTIVE_SALE_BY_COUPON_QUERYResult } from "../../../sanity.types";

export default function ClientBasket() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] =
    useState<ACTIVE_SALE_BY_COUPON_QUERYResult | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }
  const originalAmount = groupedItems.reduce(
    (acc, item) => acc + item.product.price! * item.quantity,
    0
  );
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    return (originalAmount * (appliedCoupon?.discountAmount || 0)) / 100;
  };
  const calculateFinalAmount = () => {
    return originalAmount - calculateDiscount();
  };
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const {
        data: { coupon },
      } = (await axios.post("/api/verifyCoupon", {
        couponCode,
      })) as {
        data: {
          message: string;
          coupon: ACTIVE_SALE_BY_COUPON_QUERYResult;
        };
      };
      if (!coupon) {
        setCouponError("Invalid or expired coupon code");
        setAppliedCoupon(null);
        return;
      }
      setAppliedCoupon(coupon);
      toast(`Coupon applied: ${coupon.discountAmount}% off`);
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError("Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const finalAmount = calculateFinalAmount();
      const discountAmount = calculateDiscount();

      const options = {
        amount: Math.round(finalAmount * 100), // Amount in paisa (1 INR = 100 paisa)
        currency: "INR",
        receipt: crypto.randomUUID(),
        payment_capture: 1, // Auto capture payment
        notes: {
          customerName: user?.fullName ?? "Unknown",
          customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
          clerkUserId: user!.id,
          couponCode: appliedCoupon?.couponCode || "",
          discountAmount: Math.round(discountAmount * 100) || 0,
          discountPercentage: appliedCoupon?.discountAmount || 0,
        },
      };

      try {
        const order = await axios.post("/api/createOrder", options);
        setIsLoading(true);

        if (order) {
          const { id: orderId } = order.data.order;

          const razorpayOptions = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: options.amount,
            currency: options.currency,
            name: "Raj Vadeghar - R44j",
            description: "",
            order_id: orderId,
            // @ts-ignore
            handler: async function (response: any) {
              const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              } = response;

              try {
                setIsLoading(true);

                const result = await axios.post("/api/completeOrder", {
                  orderId: razorpay_order_id,
                  paymentId: razorpay_payment_id,
                  signature: razorpay_signature,
                  products: groupedItems.map((item) => ({
                    product: item.product,
                    quantity: item.quantity,
                  })),
                  userData: {
                    userId: user!.id,
                    name: user?.fullName ?? "Unknown",
                    email: user?.emailAddresses[0].emailAddress ?? "Unknown",
                  },
                  orderAmount: options.amount,
                  currency: options.currency,
                  couponDetails: appliedCoupon
                    ? {
                        couponCode: appliedCoupon.couponCode,
                        discountAmount: Math.round(discountAmount * 100),
                      }
                    : null,
                });

                if (result.data.success) {
                  // Clear basket
                  useBasketStore.getState().clearBasket();

                  // Redirect to success page with order details
                  router.push(`/order-confirmation/${razorpay_order_id}`);
                } else {
                  throw new Error(
                    result.data.message || "Failed to process order"
                  );
                }
              } catch (error) {
                console.error("Error processing order:", error);
                router.push(
                  `/order-failed?error=${encodeURIComponent(
                    "Payment verification failed"
                  )}`
                );
              }
            },
            prefill: {
              name: user?.fullName ?? "Unknown",
              email: user?.emailAddresses[0].emailAddress ?? "Unknown",
            },
            notes: options.notes,
            theme: {
              color: "#F37254",
            },
          };

          // @ts-ignore
          const razorpay = new (window as any).Razorpay(razorpayOptions);
          razorpay.open();
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast("Failed to create checkout session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        {groupedItems?.map((item) => (
          <div
            key={item.product._id}
            className="mb-4 p-4 border rounded flex items-center justify-between"
          >
            <div
              className="flex items-center cursor-pointer flex-1 min-w-0"
              onClick={() =>
                router.push(`/product/${item.product.slug?.current}`)
              }
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                {item.product.image && (
                  <Image
                    src={imageUrl(item.product.image).url()}
                    alt={item.product.name ?? "Product image"}
                    className="w-full h-full object-cover rounded"
                    width={96}
                    height={96}
                  />
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">
                  {item.product.name}
                </h2>
                <p className="text-sm sm:text-base">
                  Price: ₹
                  {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center ml-4 flex-shrink-0">
              <AddToBasketButton product={item.product} />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-80 lg:sticky lg:top-4 p-6 border rounded h-fit order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
        <h3 className="text-xl font-semibold">Order Summary</h3>

        {/* Coupon input section */}
        <div className="mt-4 mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="p-2 border rounded flex-grow text-sm"
              disabled={!!appliedCoupon || isApplyingCoupon}
            />
            {!appliedCoupon ? (
              <button
                onClick={handleApplyCoupon}
                disabled={isApplyingCoupon}
                className="px-2 py-1 bg-blue-500 text-white rounded text-sm disabled:bg-gray-400"
              >
                {isApplyingCoupon ? "..." : "Apply"}
              </button>
            ) : (
              <button
                onClick={() => {
                  setAppliedCoupon(null);
                  setCouponCode("");
                }}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm"
              >
                Remove
              </button>
            )}
          </div>
          {couponError && (
            <p className="text-red-500 text-xs mt-1">{couponError}</p>
          )}
          {appliedCoupon && (
            <div className="mt-2 p-2 bg-green-100 rounded text-sm">
              <p className="text-green-800">
                {appliedCoupon.title}: {appliedCoupon.discountAmount}% off
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Items: </span>
            <span>
              {groupedItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Subtotal: </span>
            <span>₹{originalAmount.toFixed(2)}</span>
          </p>

          {appliedCoupon && (
            <p className="flex justify-between text-sm text-red-600">
              <span>Discount ({appliedCoupon.discountAmount}%): </span>
              <span>-₹{calculateDiscount().toFixed(2)}</span>
            </p>
          )}

          <p className="flex justify-between text-2xl font-bold border-t pt-2">
            <span>Total: </span>
            <span>₹{calculateFinalAmount().toFixed(2)}</span>
          </p>
        </div>

        {isSignedIn ? (
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="mt-4 w-full disabled:bg-gray-400 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign in to Checkout
            </button>
          </SignInButton>
        )}
      </div>

      <div className="h-64 lg:h-0">
        {/* Spacer for fixed checkout on mobile */}
      </div>
    </div>
  );
}
