import { imageUrl } from "@/lib/imageUrl";
import { sleep } from "@/lib/utils";
import useBasketStore from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductType } from "../../../sanity.types";
import { Button } from "../ui/button";

function ProductThumb({ product }: { product: ProductType }) {
  const { addItem } = useBasketStore();
  const [addedToBasket, setAddedToBasket] = useState(false);
  const router = useRouter();
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div
      onClick={() => {
        router.push(`/product/${product.slug?.current}`);
      }}
      className={`group flex flex-col rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutOfStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold Otext-gray-800 truncate">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-secondary-foreground line-clamp-2">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No description available"}
        </p>

        <p className="mt-2 text-lg font-bold @text-gray-900">
          ₹{product.price}
        </p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setAddedToBasket(true);
            addItem(product);
            sleep(5000).then(() => {
              setAddedToBasket(false);
            });
          }}
          disabled={addedToBasket}
          className="w-full mt-4"
        >
          {addedToBasket ? "Successfully added" : "Add to basket"}
        </Button>
      </div>
    </div>
  );
}
export default ProductThumb;
