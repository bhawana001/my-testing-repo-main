// Start a stream — use case #12 (act on a filtered result). Drives the /watch player.
// POST /api/stream/play  body: { titleId, videoUrl? }
// Echoes back a play session; streamUrl is the caller-supplied videoUrl (so you
// can stream ANY video, e.g. a kane-cli demo recording) or null, in which case
// the player shows the title card instead of a broken <video>.
import { TITLES } from "../../../stream-clone-app/data";

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { titleId, videoUrl } = body;
  const title = TITLES.find((t) => t.id === titleId);
  if (!titleId) {
    return Response.json({ ok: false, error: "titleId is required" }, { status: 400 });
  }
  return Response.json(
    {
      ok: true,
      sessionId: "PLAY-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
      titleId,
      title: title ? title.title : titleId,
      streamUrl: videoUrl || null,
      status: "playing",
      startedAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
