import { isCollection, get, update, remove } from "../../_store";

// GET/PATCH/DELETE /api/crmforce/:collection/:id
export async function GET(_request, { params }) {
  const { collection, id } = await params;
  if (!isCollection(collection)) {
    return Response.json({ error: "Unknown collection" }, { status: 404 });
  }
  const record = get(collection, id);
  if (!record) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ data: record });
}

export async function PATCH(request, { params }) {
  const { collection, id } = await params;
  if (!isCollection(collection)) {
    return Response.json({ error: "Unknown collection" }, { status: 404 });
  }
  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const record = update(collection, id, body);
  if (!record) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ data: record });
}

export async function DELETE(_request, { params }) {
  const { collection, id } = await params;
  if (!isCollection(collection)) {
    return Response.json({ error: "Unknown collection" }, { status: 404 });
  }
  const ok = remove(collection, id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}
