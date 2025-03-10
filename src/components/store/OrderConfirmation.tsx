// src/components/store/OrderConfirmation.tsx
"use client";

import { imageUrl } from "@/lib/imageUrl";
import { formatDate } from "@/lib/utils";
import { PrinterIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ORDER_BY_ID_QUERYResult } from "../../../sanity.types";
import Loader from "../Loader";
import { Button } from "../ui/button";

export default function OrderConfirmation({
  order,
}: {
  order: ORDER_BY_ID_QUERYResult;
}) {
  const [isClient, setIsClient] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="p-6 rounded-lg shadow-md print:shadow-none">
        <div className="flex justify-between items-center print:flex-col print:items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmation</h1>
            <p className="text-green-600 font-semibold">
              Your order has been placed successfully!
            </p>
          </div>
          <div className="print:hidden">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex items-center gap-2 py-2 px-4 rounded"
            >
              <PrinterIcon size={18} />
              Print
            </Button>
          </div>
        </div>

        <div className="my-6 p-4 rounded print:bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Order Details</h3>
              <p className="mt-1">Order ID: {order.orderId}</p>
              <p>Date: {order.orderDate ? formatDate(order.orderDate) : ""}</p>
              <p>
                Status: <span className="text-green-600 font-medium">Paid</span>
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">
                Customer Information
              </h3>
              <p className="mt-1">Name: {order.name}</p>
              <p>Email: {order.email}</p>
            </div>
          </div>
        </div>

        <div className="my-6">
          <h3 className="font-semibold text-lg mb-3">Order Items</h3>
          <div className="border-t">
            {order.products?.map((item, index: number) => (
              <div key={index} className="py-4 border-b flex items-center">
                <div className="w-16 h-16 flex-shrink-0">
                  {item.product?.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? ""}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>
                <div className="ml-4 flex-grow">
                  <Link href={`/product/${item.product?.slug?.current}`}>
                    <p className="font-medium">{item.product?.name}</p>
                  </Link>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} × ₹{item.product?.price}
                  </p>
                </div>
                <div className="text-right">
                  ₹{item.product?.price ?? 0 * (item.quantity ?? 0)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{order.totalAmount ?? 0 + (order.discountAmount || 0)}</span>
          </div>

          {order.couponCode && (
            <div className="flex justify-between mb-2 text-red-600">
              <span>Discount ({order.couponCode}):</span>
              <span>-₹{order.discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded print:hidden"
          >
            <ShoppingBagIcon size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
