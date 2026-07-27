// Demo auth — #2, #6. Fabricated token, no real secrets.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { email, password } = body;
  const valid = typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && typeof password === "string" && password.length >= 4;
  if (!valid) return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  const token = "streamflix_" + Buffer.from(`${email}:${Date.now()}`).toString("base64url");
  return Response.json({ ok: true, token, user: { email, role: "viewer", plan: "premium" } }, { status: 200 });
}
