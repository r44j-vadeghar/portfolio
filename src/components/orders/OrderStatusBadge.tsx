import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status?: "cancelled" | "delivered" | "paid" | "pending" | "shipped";
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  switch (status) {
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "delivered":
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
          Delivered
        </Badge>
      );
    case "paid":
      return (
        <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
          Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-600">
          Pending
        </Badge>
      );
    case "shipped":
      return (
        <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">
          Shipped
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
