export async function POST(request) {
  // Demo endpoint — accepts { product, qty }, returns a fake cart result.
  // No database; the cart id is freshly generated per request.
  let body = {};
  try {
    body = await request.json();
  } catch {
    // Ignore malformed JSON; this is a demo and we still respond 200.
  }

  const { product, qty } = body;
  const cartId = "cart_" + Math.random().toString(36).slice(2, 10);

  return Response.json(
    {
      ok: true,
      cartId,
      total: 24,
      product: product ?? null,
      qty: qty ?? null,
    },
    { status: 200 }
  );
}
