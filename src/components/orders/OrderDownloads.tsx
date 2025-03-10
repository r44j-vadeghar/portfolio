// src/components/orders/OrderDownloads.tsx
import { getOrderAssets } from "@/sanity/lib/order/getOrderAssets";
import DownloadButton from "./DownloadButton";

export default async function OrderDownloads({
  orderId,
  userId,
}: {
  orderId: string | undefined;
  userId: string | undefined;
}) {
  if (!orderId || !userId) {
    return null;
  }
  const assets = await getOrderAssets(orderId, userId);

  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {assets.map((asset) => (
        <DownloadButton key={asset._id} asset={asset} />
      ))}
    </div>
  );
}
