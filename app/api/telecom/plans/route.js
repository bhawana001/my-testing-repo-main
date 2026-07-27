// Plans listing — #4 schema/field validation. GET /api/telecom/plans[?type=fiber]
const PLANS = [
  { id: "fiber100", name: "Fiber 100", type: "fiber", speed: "100 Mbps", price: 799 },
  { id: "fiber200", name: "Fiber 200", type: "fiber", speed: "200 Mbps", price: 1199 },
  { id: "fiber300", name: "Fiber 300", type: "fiber", speed: "300 Mbps", price: 1499 },
  { id: "pp449", name: "Postpaid 449", type: "postpaid", speed: "Unlimited", price: 449 },
  { id: "pre199", name: "Prepaid 199", type: "prepaid", speed: "1.5 GB/day", price: 199 },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  let plans = PLANS;
  if (type) plans = plans.filter((p) => p.type === type.toLowerCase());
  return Response.json({ ok: true, count: plans.length, plans }, { status: 200 });
}
