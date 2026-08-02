// Submit a fraud report — use case #9 (input validation: 400 then 201). Drives the report-fraud form.
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
