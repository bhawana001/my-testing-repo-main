// Create a booking — #3 seed-then-verify, #8 curl, #11 E2E. Drives the /pay UI.
import { LISTINGS } from "../../../travel-clone-app/data";

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { listingId, checkin, checkout, guests } = body;
  const listing = LISTINGS.find((l) => l.id === listingId);
  if (!listing || !checkin || !checkout) {
    return Response.json({ ok: false, error: "listingId, checkin and checkout are required" }, { status: 400 });
  }
  return Response.json(
    {
      ok: true,
      bookingId: "BKG-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      listingId,
      title: listing.title,
      status: "confirmed",
      guests: Number(guests) || 1,
      checkin,
      checkout,
      total: Number(body.total) || listing.price,
      currency: "INR",
    },
    { status: 201 }
  );
}
