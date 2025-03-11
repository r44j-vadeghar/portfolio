import BlackFridayBanner from "@/components/store/BlackFridayBanner";
import ProductsView from "@/components/store/ProductsView";
import { getAllProductCatgories } from "@/sanity/lib/products/getAllProductCatgories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 3600;

async function Store() {
  const products = await getAllProducts();
  const categories = await getAllProductCatgories();

  return (
    <div>
      <BlackFridayBanner />

      <div className="flex flex-col items-center justify-top min-h-screen p-4 mx-auto max-w-7xl">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default Store;
