import { isCollection, list, create } from "../_store";

// GET /api/crmforce/:collection  -> list all records
// POST /api/crmforce/:collection -> create a record
export async function GET(_request, { params }) {
  const { collection } = await params;
  if (!isCollection(collection)) {
    return Response.json({ error: "Unknown collection" }, { status: 404 });
  }
  return Response.json({ data: list(collection) });
}

export async function POST(request, { params }) {
  const { collection } = await params;
  if (!isCollection(collection)) {
    return Response.json({ error: "Unknown collection" }, { status: 404 });
  }
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const record = create(collection, body);
  return Response.json({ data: record }, { status: 201 });
}
