// Demo auth — #2, #6. Login.gov-style user ID + password. Fabricated token.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { email, password } = body;
  const valid = typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && typeof password === "string" && password.length >= 4;
  if (!valid) return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  const token = "usaservices_" + Buffer.from(`${email}:${Date.now()}`).toString("base64url");
  return Response.json({ ok: true, token, user: { email, role: "citizen" } }, { status: 200 });
}
