// Thin client-side wrapper around the CRMforce REST API.
const BASE = "/api/crmforce";

async function handle(res) {
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export async function listRecords(collection) {
  const res = await fetch(`${BASE}/${collection}`, { cache: "no-store" });
  const { data } = await handle(res);
  return data;
}

export async function createRecord(collection, fields) {
  const res = await fetch(`${BASE}/${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  const { data } = await handle(res);
  return data;
}

export async function updateRecord(collection, id, fields) {
  const res = await fetch(`${BASE}/${collection}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  const { data } = await handle(res);
  return data;
}

export async function deleteRecord(collection, id) {
  const res = await fetch(`${BASE}/${collection}/${id}`, { method: "DELETE" });
  await handle(res);
  return true;
}

export function formatCurrency(n) {
  const value = Number(n) || 0;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
