// Add to cart — Use cases #3 (seed-then-verify), #8 (curl). Also drives the UI.
// POST /api/shop/cart  body: { productId, qty }
// Valid product -> 201 with line total; unknown/invalid -> 400.
import { PRODUCTS } from "../../../shop-clone-app/data";

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // fall through to validation
  }

  const { productId, qty } = body;
  const product = PRODUCTS.find((p) => p.id === productId);
  const quantity = Number(qty) || 1;

  if (!product) {
    return Response.json(
      { ok: false, error: "unknown productId" },
      { status: 400 }
    );
  }

  const cartId = "cart_" + Math.random().toString(36).slice(2, 10);
  return Response.json(
    {
      ok: true,
      cartId,
      item: { id: product.id, title: product.title, price: product.price, qty: quantity },
      lineTotal: Number((product.price * quantity).toFixed(2)),
    },
    { status: 201 }
  );
}
