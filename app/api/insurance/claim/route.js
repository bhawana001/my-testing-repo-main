// Locate a claim — #3 seed-then-verify, #11 E2E. Drives the /claim UI.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { claimNumber, firstName, lastName } = body;
  if (!claimNumber || !firstName || !lastName) {
    return Response.json({ ok: false, error: "claimNumber, firstName and lastName are required" }, { status: 400 });
  }
  const statuses = ["In Review", "Adjuster Assigned", "Approved", "Payment Issued"];
  const status = statuses[claimNumber.length % statuses.length];
  return Response.json(
    {
      ok: true,
      claimNumber,
      claimant: `${firstName} ${lastName}`,
      status,
      adjuster: "A. Morgan",
      eta: "5-7 business days",
    },
    { status: 200 }
  );
}
