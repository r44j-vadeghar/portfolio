// src/app/(store)/basket/page.tsx
import ClientBasket from "@/components/store/ClientBasket";

async function BasketPage() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>

      <ClientBasket />
    </div>
  );
}

export default BasketPage;
