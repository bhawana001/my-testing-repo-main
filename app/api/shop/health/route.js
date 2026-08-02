// Smoke-test endpoint — use case #1 (liveness / smoke).
export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "shopkart",
      db: "connected",
      version: "1.0.0",
      time: new Date().toISOString(),
    },
    { status: 200 }
  );
}
