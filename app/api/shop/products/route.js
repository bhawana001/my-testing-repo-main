// Product listing — Use case #4 (schema / field validation).
// GET /api/shop/products[?category=gaming][?q=headset]
import { PRODUCTS } from "../../../shop-clone-app/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  let products = PRODUCTS;
  if (category) products = products.filter((p) => p.category === category.toLowerCase());
  if (q) {
    const needle = q.toLowerCase();
    products = products.filter((p) => p.title.toLowerCase().includes(needle));
  }

  // Return only API-relevant fields (schema stability for testers).
  const items = products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    rating: p.rating,
    ratingCount: p.ratingCount,
    inStock: true,
  }));

  return Response.json({ ok: true, count: items.length, products: items }, { status: 200 });
}
