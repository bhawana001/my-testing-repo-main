// Smoke-test endpoint — Use case #1.
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
