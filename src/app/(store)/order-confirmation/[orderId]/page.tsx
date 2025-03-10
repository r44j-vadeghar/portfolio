// src/app/(store)/order-confirmation/[orderId]/page.tsx
import OrderConfirmation from "@/components/store/OrderConfirmation";
import { getOrderDetailsById } from "@/sanity/lib/order/getOrderDetailsById";
import { notFound } from "next/navigation";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrderDetailsById(orderId);

  if (!order) {
    notFound();
  }

  return <OrderConfirmation order={order} />;
}
