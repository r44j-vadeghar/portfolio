"use client";
import useBasketStore from "@/store/store";
import { ProductType } from "../../../sanity.types";
import { Button } from "../ui/button";

interface AddToBasketProps {
  product: ProductType;
  disabled?: boolean;
}

function AddToBasket({ product, disabled }: AddToBasketProps) {
  const { addItem } = useBasketStore();

  return (
    <Button disabled={disabled} onClick={() => addItem(product)}>
      Add to basket
    </Button>
  );
}

export default AddToBasket;
