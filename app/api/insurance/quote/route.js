// Get an insurance quote — #3 seed, #4 schema, #8 curl. Drives the /quote UI.
const BASE_RATE = {
  auto: 120, homeowners: 90, renters: 18, motorcycle: 45, boat: 60,
  commercial: 210, life: 35, umbrella: 25, travel: 40, pet: 30, jewelry: 15, flood: 55, bundle: 150,
};

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { product, zip, age } = body;
  const base = BASE_RATE[product];
  if (!base || !/^\d{5}$/.test(String(zip || "")) || !(Number(age) >= 16 && Number(age) <= 100)) {
    return Response.json({ ok: false, error: "product, valid zip and age (16-100) are required" }, { status: 400 });
  }
  // Simple deterministic-ish premium from age.
  const ageFactor = Number(age) < 25 ? 1.4 : Number(age) > 65 ? 1.15 : 1.0;
  const monthly = Math.round(base * ageFactor);
  return Response.json(
    {
      ok: true,
      quoteId: "QTE-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      product,
      monthlyPremium: monthly,
      annualSavings: Math.round(base * 1.2),
      currency: "USD",
    },
    { status: 201 }
  );
}
