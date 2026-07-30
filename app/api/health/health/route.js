// Smoke-test endpoint — same shape as use case #1 (liveness / smoke).
// GET /api/health/health -> service liveness.
export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "carewell",
      db: "connected",
      version: "1.0.0",
      time: new Date().toISOString(),
    },
    { status: 200 }
  );
}
