// Services/topics — #4 schema/field validation. GET /api/gov/services[?topic=taxes]
const SERVICES = [
  { id: "taxes", topic: "taxes", name: "File federal taxes", agency: "IRS" },
  { id: "refund", topic: "taxes", name: "Check tax refund status", agency: "IRS" },
  { id: "passport", topic: "travel", name: "Get or renew a passport", agency: "State Dept" },
  { id: "benefits", topic: "benefits", name: "Find government benefits", agency: "GSA" },
  { id: "housing", topic: "housing", name: "Get housing help", agency: "HUD" },
  { id: "report-fraud", topic: "taxes", name: "Report tax fraud or a scam", agency: "IRS" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");
  let services = SERVICES;
  if (topic) services = services.filter((s) => s.topic === topic.toLowerCase());
  return Response.json({ ok: true, count: services.length, services }, { status: 200 });
}
