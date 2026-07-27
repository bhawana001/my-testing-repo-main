// Titles for the streaming clone. Colored tiles stand in for artwork.
export const TITLES = [
  { id: "suits", title: "SUITS", year: 2011, genre: "Drama", seasons: 9, rating: "U/A 13+", c: "#7b4b2a", featured: true, desc: "A brilliant college dropout lands a job at a top law firm alongside one of NYC's best closers." },
  { id: "lockupp", title: "Lock Upp", year: 2026, genre: "Reality", c: "#8a1f2b", tag: "New Episode" },
  { id: "musafir", title: "Musafir Cafe", year: 2026, genre: "Drama", c: "#3f5a2e", tag: "Recently added" },
  { id: "72hours", title: "72 Hours", year: 2026, genre: "Thriller", c: "#b03a2e" },
  { id: "concity", title: "Con City", year: 2026, genre: "Crime", c: "#2c3e50" },
  { id: "toxic", title: "A Toxic Love Story", year: 2026, genre: "Romance", c: "#7d3c98" },
  { id: "b99", title: "Brooklyn Nine-Nine", year: 2013, genre: "Comedy", c: "#1f6fb2" },
  { id: "gotlatent", title: "India's Got Latent", year: 2026, genre: "Comedy", c: "#111", tag: "New Episode" },
  { id: "themiddle", title: "The Middle", year: 2009, genre: "Comedy", c: "#2e86c1" },
  { id: "ikka", title: "IKKA", year: 2026, genre: "Action", c: "#5b2c6f", tag: "Recently added" },
  { id: "vampire", title: "The Vampire Diaries", year: 2009, genre: "Fantasy", c: "#4a235a" },
  { id: "mentalist", title: "The Mentalist", year: 2008, genre: "Crime", c: "#d35400" },
  { id: "bigbang", title: "The Big Bang Theory", year: 2007, genre: "Comedy", c: "#1a5276" },
  { id: "friends", title: "FRIENDS", year: 1994, genre: "Comedy", c: "#616a6b" },
  { id: "office", title: "The Office", year: 2005, genre: "Comedy", c: "#34495e" },
  { id: "30rock", title: "30 Rock", year: 2006, genre: "Comedy", c: "#943126" },
  { id: "seinfeld", title: "Seinfeld", year: 1989, genre: "Comedy", c: "#b7950b" },
  { id: "gossip", title: "Gossip Girl", year: 2007, genre: "Drama", c: "#7b241c" },
  { id: "ginny", title: "Ginny & Georgia", year: 2021, genre: "Drama", c: "#1e8449" },
  { id: "emily", title: "Emily in Paris", year: 2020, genre: "Romance", c: "#c0392b" },
];

export const ROWS = [
  { title: "New on StreamFlix", ids: ["lockupp", "musafir", "72hours", "concity", "toxic"] },
  { title: "Continue Watching for you", ids: ["b99", "lockupp", "gotlatent", "themiddle", "ikka"] },
  { title: "Your Next Watch", ids: ["vampire", "mentalist", "bigbang", "friends", "office"] },
  { title: "Top 10 Shows Today", ids: ["musafir", "lockupp", "72hours", "concity", "toxic"], ranked: true },
  { title: "Award-winning Comedy Series", ids: ["office", "friends", "30rock", "seinfeld", "b99"] },
  { title: "TV Serial Dramas", ids: ["gossip", "ginny", "emily", "suits", "ikka"] },
];

export function getTitle(id) {
  return TITLES.find((t) => t.id === id);
}
export function titlesByIds(ids) {
  return ids.map((id) => getTitle(id)).filter(Boolean);
}
