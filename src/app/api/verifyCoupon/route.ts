// src/app/(store)/api/verifyCoupon/route.ts
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { couponCode } = await request.json();

    if (!couponCode) {
      return NextResponse.json(
        { message: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = await getActiveSaleByCouponCode(couponCode);

    if (!coupon) {
      return NextResponse.json(
        { message: "Invalid or expired coupon code" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Coupon applied successfully",
        coupon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying coupon:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
