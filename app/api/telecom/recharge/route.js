// Recharge / pay bill — #3 seed, #8 curl, #11 E2E. Drives /recharge and /bill-payment.
// POST /api/telecom/recharge  body: { mobile, amount, type }
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { mobile, amount, type } = body;
  if (!mobile || !(Number(amount) > 0)) {
    return Response.json({ ok: false, error: "mobile and a positive amount are required" }, { status: 400 });
  }
  return Response.json(
    {
      ok: true,
      txnId: "TXN-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
      mobile,
      amount: Number(amount),
      type: type || "prepaid",
      status: "success",
      processedAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
