// src/app/(store)/api/createOrder/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string;
const key_secret = process.env.RAZORPAY_KEY_SECRET as string;

if (!key_id || !key_secret) {
  throw new Error("Razorpay keys are missing");
}

const razorpay = new Razorpay({
  key_id,
  key_secret,
});

export type OrderOptions = {
  amount: number;
  currency: string;
  receipt: string;
  payment_capture: number;
  notes: {
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
    couponCode: string;
    discountAmount: number;
    discountPercentage: number;
  };
};

export async function POST(request: NextRequest) {
  try {
    const options: OrderOptions = await request.json();
    if (!options.amount || !options.currency || !options.receipt) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
