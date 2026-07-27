// Demo auth — #2, #6. Login by mobile number + password. Fabricated token.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { mobile, password } = body;
  const valid = typeof mobile === "string" && /^\d{10}$/.test(mobile) && typeof password === "string" && password.length >= 4;
  if (!valid) return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  const token = "airwave_" + Buffer.from(`${mobile}:${Date.now()}`).toString("base64url");
  return Response.json({ ok: true, token, user: { mobile, role: "subscriber" } }, { status: 200 });
}
