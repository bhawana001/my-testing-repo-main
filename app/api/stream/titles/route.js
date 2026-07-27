// Titles catalog — #4 schema/field validation. GET /api/stream/titles[?genre=Comedy]
import { TITLES } from "../../../stream-clone-app/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  let titles = TITLES;
  if (genre) titles = titles.filter((t) => t.genre.toLowerCase() === genre.toLowerCase());
  const items = titles.map((t) => ({ id: t.id, title: t.title, year: t.year, genre: t.genre }));
  return Response.json({ ok: true, count: items.length, titles: items }, { status: 200 });
}
