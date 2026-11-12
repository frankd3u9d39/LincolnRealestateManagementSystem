import { Suspense } from "react";
import { ProductCatalogRoute } from "../components/store-screens";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="state-card">Loading product catalog…</div>}>
      <ProductCatalogRoute />
    </Suspense>
  );
}
