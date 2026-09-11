// Card payment for the ShopKart checkout — the "Stripe" side of the flow.
// POST /api/shop/pay  body: { cardNumber, exp, cvc, amount }
//
// Valid test card        4242 4242 4242 4242 -> 201 { chargeId, status: "succeeded" }
// Decline test card      4000 0000 0000 0002 -> 402 { error: "card_declined" }
// Missing / short card                       -> 400 { error: "invalid card details" }
//
// A short delay is deliberate: it keeps the "Processing…" state on screen long
// enough to be visible in a recorded run.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // fall through to validation
  }

  const { cardNumber, exp, cvc, amount } = body;
  const digits = String(cardNumber || "").replace(/\s+/g, "");

  if (digits.length < 15 || !exp || String(cvc || "").length < 3) {
    return Response.json(
      { ok: false, error: "invalid card details" },
      { status: 400 }
    );
  }

  await new Promise((r) => setTimeout(r, 700));

  if (digits === "4000000000000002") {
    return Response.json(
      { ok: false, error: "card_declined", declineCode: "generic_decline" },
      { status: 402 }
    );
  }

  return Response.json(
    {
      ok: true,
      chargeId: "ch_" + Math.random().toString(36).slice(2, 12),
      status: "succeeded",
      amount: Number(amount) || 0,
      currency: "usd",
      last4: digits.slice(-4),
      paidAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
