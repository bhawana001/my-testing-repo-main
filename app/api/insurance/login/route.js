// Demo auth — use case #6 (negative path, 401) and use case #13 (session reuse).
// Fabricated token, no real secrets.
// On success it also sets an httpOnly `safeguard_session` cookie so the dashboard
// stays reachable across runs without logging in again.
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
    {
      status: 200,
      headers: {
        // 30 days, httpOnly so only the server sees it — the dashboard gates on this.
        "Set-Cookie": `safeguard_session=${token}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax`,
      },
    }
  );
}

// Sign out — clears the session cookie so the next run starts cold.
export async function DELETE() {
  return Response.json(
    { ok: true, signedOut: true },
    {
      status: 200,
      headers: {
        "Set-Cookie": "safeguard_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax",
      },
    }
  );
}
