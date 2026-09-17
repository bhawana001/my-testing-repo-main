// Builds lib/clone-map.json for the homepage: which clone app each entity lives
// in (with its in-app brand name) and which clone route each flow's test opens.
// Source of truth is the tests themselves, so the page can't drift from them.
// Run: node scripts/gen-clone-map.mjs
import fs from "fs";
import { ENTITIES, FLOWS } from "../lib/registry.js";

const FIXED = { "shop-clone-app": "ShopKart", "stream-clone-app": "StreamFlix" };
const brandOf = (app) => {
  if (FIXED[app]) return FIXED[app];
  const src = fs.readFileSync(`app/${app}/shared.js`, "utf8");
  return src.match(/BRAND\s*=\s*\{[^}]*?name:\s*"([^"]+)"/)[1];
};

const entities = {};
const flows = {};
for (const f of FLOWS) {
  const md = fs.readFileSync(f.testPath, "utf8");
  const url = new URL(md.match(/^url:\s*(\S+)/m)[1]);
  url.searchParams.delete("reset");
  const path = url.pathname + (url.search || "");
  flows[`${f.entitySlug}/${f.slug}`] = path;
  const app = url.pathname.split("/")[1];
  entities[f.entitySlug] ??= { app: `/${app}`, brand: brandOf(app) };
}
for (const e of ENTITIES) if (!entities[e.slug]) throw new Error(`no clone app for ${e.slug}`);
fs.writeFileSync("lib/clone-map.json", JSON.stringify({ entities, flows }, null, 1) + "\n");
console.log(`${Object.keys(entities).length} entities, ${Object.keys(flows).length} flows`);
