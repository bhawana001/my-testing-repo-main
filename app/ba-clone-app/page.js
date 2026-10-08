import { redirect } from "next/navigation";

// The real site's root lands on /travel/home/public/{locale}/; keep ?reset=true.
export default async function BaRoot({ searchParams }) {
  const q = new URLSearchParams(await searchParams).toString();
  redirect("/ba-clone-app/travel/home/public/en_in" + (q ? `?${q}` : ""));
}
