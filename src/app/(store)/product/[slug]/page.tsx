import AddToBasket from "@/components/store/AddToBasket";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";

export const dynamic = "force-static";
export const revalidate = 3600;

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // const { addItem } = useBasketStore();
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          <ViewTransition name={`${product.slug?.current}-product-image`}>
            {product.image && (
              <Image
                src={imageUrl(product.image).url()}
                alt={product.name ?? "Product image"}
                fill
                className="object-contain transition-transform duration-300 hover: scale-105"
              />
            )}
          </ViewTransition>
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
              <span className="font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <ViewTransition name={`${product.slug?.current}-product-name`}>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            </ViewTransition>
            <ViewTransition name={`${product.slug?.current}-product-price`}>
              <div className="text-xl font-semibold mb-4">₹{product.price}</div>
            </ViewTransition>
            <ViewTransition name={`${product.slug?.current}-product-desc`}>
              <div className="prose dark:prose-invert max-w-none mb-6">
                {Array.isArray(product.description) && (
                  <PortableText value={product.description} />
                )}
              </div>
            </ViewTransition>
          </div>

          <div className="mt-6">
            <ViewTransition
              name={`${product.slug?.current}-product-add-to-basket`}
            >
              <AddToBasket product={product} disabled={isOutOfStock} />
            </ViewTransition>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
