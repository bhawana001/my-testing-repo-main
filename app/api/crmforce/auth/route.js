// CRMforce demo auth.
// POST { email, password } with password === "demo" -> sets httpOnly session cookie.
// DELETE -> clears the session (sign out).
// This is a lightweight demo gate, NOT production security.

const COOKIE = "crmforce_session";

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { email, password } = body;
  if (!email || password !== "demo") {
    return Response.json(
      { error: "Invalid credentials. Use any email and password: demo" },
      { status: 401 }
    );
  }

  const session = Buffer.from(`${email}:${Date.now()}`).toString("base64url");
  const res = Response.json({ ok: true, user: { email } });
  res.headers.append(
    "Set-Cookie",
    `${COOKIE}=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  );
  return res;
}

export async function DELETE() {
  const res = Response.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  return res;
}
