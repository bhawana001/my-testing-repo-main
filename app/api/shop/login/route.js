// Demo auth endpoint — use case #10 (step 1 of the multi-step transaction). Fabricated token only.
// POST /api/shop/login  body: { email, password }  -> 200 token / 401 invalid.
// NOTE: fabricated demo token only — no real secrets, no user database.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // fall through to invalid
  }

  const { email, password } = body;
  const valid =
    typeof email === "string" &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    typeof password === "string" &&
    password.length >= 4;

  if (!valid) {
    return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  }

  const token =
    "shopkart_" + Buffer.from(`${email}:${Date.now()}`).toString("base64url");
  return Response.json(
    { ok: true, token, user: { email, role: "shopper", name: email.split("@")[0] } },
    { status: 200 }
  );
}
