import { ProductCategory, ProductType } from "../../../sanity.types";
import CategorySelectorComponent from "./CategorySelectorComponent";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: ProductType[];
  categories: ProductCategory[];
}
function ProductsView({ products, categories }: ProductsViewProps) {
  return (
    <div className="flex flex-col">
      {/* categories */}
      <div className="w-full sm:w-[200px] my-5">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />

          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
