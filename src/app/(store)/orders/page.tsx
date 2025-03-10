// src/app/(store)/orders/page.tsx
import EmptyOrders from "@/components/orders/EmptyOrders";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrdersList from "@/components/orders/OrdersList";
import { getMyOrders } from "@/sanity/lib/order/getMyOrders";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Define valid statuses
const validStatuses = ["all", "pending", "paid", "cancelled"];

async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const statusParam = (await searchParams).status as string;
  const user = await currentUser();

  if (!user) {
    return redirect("/store");
  }
  const orders = await getMyOrders(user.id);
  const status =
    statusParam && validStatuses.includes(statusParam) ? statusParam : "all";

  return (
    <div className="container mx-auto py-8 space-y-8">
      <OrdersHeader />
      {orders.length > 0 ? (
        <OrdersList orders={orders} currentStatus={status} />
      ) : (
        <EmptyOrders />
      )}
    </div>
  );
}

export default OrdersPage;
