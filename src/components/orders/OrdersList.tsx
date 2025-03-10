// src/components/orders/OrdersList.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MY_ORDERS_QUERYResult } from "../../../sanity.types";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: MY_ORDERS_QUERYResult;
  currentStatus?: string;
}

export default function OrdersList({
  orders,
  currentStatus = "all",
}: OrdersListProps) {
  const filteredOrders =
    currentStatus === "all"
      ? orders
      : orders.filter((order) => order.status === currentStatus);

  const getCountByStatus = (status: string | undefined) => {
    if (!status) return orders.length;
    return orders.filter((order) => order.status === status).length;
  };

  const allCount = orders.length;
  const pendingCount = getCountByStatus("pending");
  const paidCount = getCountByStatus("paid");
  const cancelledCount = getCountByStatus("cancelled");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <FilterLink
          href="/orders"
          active={currentStatus === "all"}
          count={allCount}
        >
          All
        </FilterLink>
        <FilterLink
          href="/orders?status=pending"
          active={currentStatus === "pending"}
          count={pendingCount}
        >
          Pending
        </FilterLink>
        <FilterLink
          href="/orders?status=paid"
          active={currentStatus === "paid"}
          count={paidCount}
        >
          Paid
        </FilterLink>
        <FilterLink
          href="/orders?status=cancelled"
          active={currentStatus === "cancelled"}
          count={cancelledCount}
        >
          Cancelled
        </FilterLink>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
}

// Helper component for filter links
function FilterLink({
  href,
  active,
  count,
  children,
}: {
  href: string;
  active: boolean;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Button variant={active ? "default" : "outline"} size="sm" asChild>
      <Link href={href}>
        {children} ({count})
      </Link>
    </Button>
  );
}
