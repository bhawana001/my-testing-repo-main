// Demo auth endpoint — Use cases #2 (auth chaining) and #6 (negative paths).
// POST /api/health/login  body: { email, password }
// Valid creds -> 200 with a demo bearer token; bad creds -> 401.
// NOTE: fabricated demo token only — no real secrets, no user database.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // malformed JSON -> treated as invalid credentials below
  }

  const { email, password } = body;
  const valid =
    typeof email === "string" &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    typeof password === "string" &&
    password.length >= 4;

  if (!valid) {
    return Response.json(
      { ok: false, error: "invalid credentials" },
      { status: 401 }
    );
  }

  const token =
    "carewell_" + Buffer.from(`${email}:${Date.now()}`).toString("base64url");

  return Response.json(
    {
      ok: true,
      token,
      user: { email, role: "patient", name: email.split("@")[0] },
    },
    { status: 200 }
  );
}
