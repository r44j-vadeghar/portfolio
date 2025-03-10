import { PackageOpen } from "lucide-react";

export default function OrdersHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <PackageOpen className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
      </div>
      <p className="text-muted-foreground">
        View and track all your orders in one place.
      </p>
    </div>
  );
}
