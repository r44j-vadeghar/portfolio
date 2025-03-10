// src/components/orders/OrderCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { imageUrl } from "@/lib/imageUrl";
import { formatCurrency } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Package } from "lucide-react";
import Image from "next/image";
import { MY_ORDERS_QUERYResult } from "../../../sanity.types";
import { Button } from "../ui/button";
import OrderDownloads from "./OrderDownloads";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderCardProps {
  order: MY_ORDERS_QUERYResult[0];
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderDate = order.orderDate
    ? formatDistanceToNow(new Date(order.orderDate), { addSuffix: true })
    : "Date unavailable";

  const formattedTotal = formatCurrency(
    order.totalAmount || 0,
    order.currency || "USD"
  );

  const productCount = order.products?.length || 0;
  const itemText = productCount === 1 ? "item" : "items";

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold mb-1">
              Order #{order.orderId || order._id.substring(0, 8)}
            </CardTitle>
            <CardDescription>
              Placed {orderDate} • {productCount} {itemText}
            </CardDescription>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {order.products &&
              order.products.length > 0 &&
              order.products[0].product?.image && (
                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-slate-100">
                  <Image
                    src={imageUrl(order.products[0].product?.image).url()}
                    alt={order.products[0].product.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            <div>
              <p className="font-medium">{formattedTotal}</p>
              {order.discountAmount && order.discountAmount > 0 && (
                <p className="text-sm text-muted-foreground">
                  Discount:{" "}
                  {formatCurrency(
                    order.discountAmount,
                    order.currency || "USD"
                  )}
                  {order.couponCode && ` (${order.couponCode})`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order details section - always visible now */}
        <div className="space-y-4">
          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Order Items</h4>
            <div className="grid gap-3">
              {order.products?.slice(0, 2).map((item) => (
                <div key={item._key} className="flex items-center space-x-3">
                  {item.product?.image && (
                    <div className="relative h-12 w-12 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={imageUrl(item.product?.image).url()}
                        alt={item.product.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} ×{" "}
                      {formatCurrency(
                        item.product?.price || 0,
                        order.currency || "USD"
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(
                        (item.product?.price || 0) * (item.quantity || 1),
                        order.currency || "USD"
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {(order.products?.length || 0) > 2 && (
                <p className="text-sm text-muted-foreground">
                  +{(order.products?.length || 0) - 2} more item(s)
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Customer Information</h4>
              <p className="text-sm">{order.name}</p>
              <p className="text-sm">{order.email}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    {formatCurrency(
                      (order.totalAmount || 0) + (order.discountAmount || 0),
                      order.currency || "USD"
                    )}
                  </span>
                </div>
                {order.discountAmount && order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount {order.couponCode && `(${order.couponCode})`}
                    </span>
                    <span>
                      -
                      {formatCurrency(
                        order.discountAmount,
                        order.currency || "USD"
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-1">
                  <span>Total</span>
                  <span>{formattedTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex justify-between">
        {/* <Button variant="outline" size="sm" asChild>
          <Link href={`/help/order/${order._id}`}>Need Help?</Link>
        </Button> */}
        {(order.status === "shipped" || order.status === "delivered") && (
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Package className="h-4 w-4 mr-1" />
            <span>Track Package</span>
          </Button>
        )}
        {order.status === "paid" && (
          <OrderDownloads orderId={order.orderId} userId={order.clerkUserId} />
        )}
      </CardFooter>
    </Card>
  );
}
