// Listings — use case #11 (cross-endpoint price consistency). GET /api/travel/listings[?city=Rishikesh]
import { LISTINGS } from "../../../travel-clone-app/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  let listings = LISTINGS;
  if (city) listings = listings.filter((l) => l.city.toLowerCase() === city.toLowerCase());
  const items = listings.map((l) => ({
    id: l.id, title: l.title, city: l.city, price: l.price,
    rating: l.rating, reviews: l.reviews, type: l.type,
  }));
  return Response.json({ ok: true, count: items.length, listings: items }, { status: 200 });
}
