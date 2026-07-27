export async function GET() {
  return Response.json(
    { status: "ok", service: "airwave", db: "connected", version: "1.0.0", time: new Date().toISOString() },
    { status: 200 }
  );
}
