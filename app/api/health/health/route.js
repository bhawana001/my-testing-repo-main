// Smoke-test endpoint — Use case #1.
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
