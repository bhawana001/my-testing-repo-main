// Submit a fraud report — #3 seed, #6 negative, #8 curl, #11 E2E. Drives the form.
// POST /api/gov/report  body: { category, details }
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { category, details } = body;
  if (!category || typeof details !== "string" || details.trim().length < 10) {
    return Response.json(
      { ok: false, error: "category and details (min 10 chars) are required" },
      { status: 400 }
    );
  }
  return Response.json(
    {
      ok: true,
      caseId: "IRS-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
      category,
      status: "received",
      anonymous: true,
      submittedAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
