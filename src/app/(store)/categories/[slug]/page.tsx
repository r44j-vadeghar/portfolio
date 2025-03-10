import ProductsView from "@/components/store/ProductsView";
import { getAllProductCatgories } from "@/sanity/lib/products/getAllProductCatgories";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductByCategory(slug);
  const categories = await getAllProductCatgories();

  return (
    <div className="flex flex-col items-center justify-top min-h-screen p-4">
      <div className="p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;
