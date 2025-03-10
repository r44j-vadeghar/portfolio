// src/components/orders/EmptyOrders.tsx
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-dashed">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <ShoppingBag className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        You haven&apos;t placed any orders yet. Browse our products and start
        shopping!
      </p>
      <Button asChild>
        <Link href="/store">Shop Now</Link>
      </Button>
    </div>
  );
}
