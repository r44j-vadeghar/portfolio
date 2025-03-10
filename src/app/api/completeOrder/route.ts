import { backendClient } from "@/sanity/lib/backendClient";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const key_secret = process.env.RAZORPAY_KEY_SECRET as string;

if (!key_secret) {
  throw new Error("Razorpay key secret is missing");
}

export async function POST(request: NextRequest) {
  try {
    const {
      orderId,
      paymentId,
      signature,
      products,
      userData,
      orderAmount,
      currency,
      couponDetails,
    } = await request.json();

    // 1. Verify payment signature
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: "Payment signature verification failed" },
        { status: 400 }
      );
    }

    // 2. Create order record in Sanity
    const order = {
      _type: "orderType",
      orderId,
      paymentId,
      signature,
      clerkUserId: userData.userId,
      name: userData.name,
      email: userData.email,
      // @ts-ignore
      products: products.map((item: any) => ({
        _key: crypto.randomUUID(),
        // _type: "object",
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity || 0,
      })),
      totalAmount: orderAmount / 100, // Convert from paisa to rupees
      currency,
      discountAmount: (couponDetails?.discountAmount || 0) / 100,
      couponCode: couponDetails?.couponCode || "",
      status: "paid",
      orderDate: new Date().toISOString(),
    };

    const createdOrder = await backendClient.create(order);

    return NextResponse.json(
      {
        success: true,
        message: "Order completed successfully",
        order: {
          id: createdOrder._id,
          orderId,
          paymentId,
          totalAmount: orderAmount / 100,
          date: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order", error },
      { status: 500 }
    );
  }
}
