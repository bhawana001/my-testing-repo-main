// Place an order (checkout) — use case #10 (step 3: order placed, item count). Drives the checkout modal.
// POST /api/shop/orders  body: { items: [{ productId, qty }], total }
// Non-empty cart -> 201 with an order id; empty -> 400.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // fall through to validation
  }

  const { items, total } = body;
  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ ok: false, error: "cart is empty" }, { status: 400 });
  }

  const orderId =
    "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return Response.json(
    {
      ok: true,
      orderId,
      status: "placed",
      itemCount: items.reduce((s, i) => s + (Number(i.qty) || 1), 0),
      total: Number(total) || 0,
      placedAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
