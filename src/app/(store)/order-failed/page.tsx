"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderFailedPage() {
  const searchParams = useSearchParams();
  const error =
    searchParams.get("error") || "There was an issue processing your payment";

  return (
    <div className="container mx-auto p-4 max-w-3xl border">
      <div className="p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle size={48} className="text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">{error}</p>

        <div className="space-y-4">
          <p className="text-gray-700">
            Your payment could not be processed. Your card has not been charged.
          </p>

          <div className="mt-8">
            <Link
              href="/basket"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
            >
              <ArrowLeft size={18} />
              Return to Basket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
