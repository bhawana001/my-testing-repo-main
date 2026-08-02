// Demo auth — use case #6 (negative path, 401). Fabricated token, no real secrets.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { email, password } = body;
  const valid = typeof email === "string" && email.length >= 3 && typeof password === "string" && password.length >= 4;
  if (!valid) return Response.json({ ok: false, error: "invalid credentials" }, { status: 401 });
  const token = "safeguard_" + Buffer.from(`${email}:${Date.now()}`).toString("base64url");
  return Response.json(
    { ok: true, token, user: { id: email, role: "policyholder", name: String(email).split("@")[0] } },
    { status: 200 }
  );
}
