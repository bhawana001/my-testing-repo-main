// Regenerates eval-status-209.csv and the sheet-paste TSV from the catalog plus
// the entity -> clone-app map below. One row per catalog row, in sheet order.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE = "https://my-testing-repo-main.vercel.app";
const rows = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/catalog-rows.json"), "utf8"));

/** Entity name in the sheet -> the clone app that now covers its use cases. */
const APPS = {
  "Amazon": "/shop-clone-app",
  "Shopify": "/shopify-clone-app",
  "Flipkart": "/flipkart-clone-app",
  "Walmart": "/walmart-clone-app",
  "Etsy": "/etsy-clone-app",
  "eBay": "/ebay-clone-app",
  "Instacart": "/instacart-clone-app",
  "Nike": "/nike-clone-app",
  "Stripe": "/stripe-clone-app",
  "PayPal": "/paypal-clone-app",
  "Razorpay": "/razorpay-clone-app",
  "Square": "/square-clone-app",
  "Adyen": "/adyen-clone-app",
  "Klarna": "/klarna-clone-app",
  "Wise": "/wise-clone-app",
  "Robinhood": "/robinhood-clone-app",
  "Zerodha": "/zerodha-clone-app",
  "Coinbase": "/coinbase-clone-app",
  "Revolut": "/revolut-clone-app",
  "Paytm": "/paytm-clone-app",
  "PhonePe": "/phonepe-clone-app",
  "Venmo": "/venmo-clone-app",
  "Chase": "/chase-clone-app",
  "HDFC Bank": "/hdfc-clone-app",
  "American Express": "/amex-clone-app",
  "Lemonade": "/lemonade-clone-app",
  "Policybazaar": "/policybazaar-clone-app",
  "Salesforce": "/salesforce-clone-app",
  "HubSpot": "/hubspot-clone-app",
  "Zendesk": "/zendesk-clone-app",
  "Intercom": "/intercom-clone-app",
  "Zoho CRM": "/zoho-clone-app",
  "Freshdesk": "/freshdesk-clone-app",
  "ServiceNow": "/servicenow-clone-app",
  "Slack": "/slack-clone-app",
  "Microsoft Teams": "/teams-clone-app",
  "Zoom": "/zoom-clone-app",
  "Notion": "/notion-clone-app",
  "Airtable": "/airtable-clone-app",
  "Asana": "/asana-clone-app",
  "Jira": "/jira-clone-app",
  "Monday.com": "/monday-clone-app",
  "DocuSign": "/docusign-clone-app",
  "Dropbox": "/dropbox-clone-app",
  "Google Drive": "/drive-clone-app",
  "Calendly": "/calendly-clone-app",
  "Netflix": "/stream-clone-app",
  "Spotify": "/spotify-clone-app",
  "YouTube": "/youtube-clone-app",
  "Disney+ Hotstar": "/hotstar-clone-app",
};

const registry = fs.readFileSync(path.join(ROOT, "lib/registry.js"), "utf8");
/** UC code -> [slug, ...] from FLOW_META, which is how tests are named. */
const FLOW_META = {};
for (const m of registry.matchAll(/"([\d.]+)"\s*:\s*\[\s*"([^"]+)"/g)) FLOW_META[m[1]] = m[2];

const status = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, "tests/status.json"), "utf8")); }
  catch { return {}; }
})();

const DIR_OVERRIDE = { "Monday.com": "monday" };
const slugEntity = (name) =>
  DIR_OVERRIDE[name] ||
  name.toLowerCase().replace(/\+/g, "").replace(/\./g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const out = [["Row", "UseCase", "Entity", "UseCaseName", "AppBuilt", "EvalLink", "TestUpdated", "Command", "KaneStatus", "KaneStatusNote"]];
const paste = [];

rows.forEach((r, i) => {
  const [, entity, , uc, ucName] = r;
  const app = APPS[entity];
  const link = app ? SITE + app : "";
  const flow = FLOW_META[uc] || "";
  const entDir = slugEntity(entity);
  const testPath = flow ? `tests/${entDir}/${flow}_test.md` : "";
  const testExists = testPath && fs.existsSync(path.join(ROOT, testPath));
  const command = testExists ? `kane-cli testmd run ${testPath}` : "";
  // Tests are rewritten against the clone app only where the frontmatter url
  // already points at one; everything else still targets the old mock route.
  let testUpdated = "no";
  if (testExists) {
    const body = fs.readFileSync(path.join(ROOT, testPath), "utf8");
    testUpdated = app && body.includes(app) ? "yes" : "no";
  }
  const key = flow ? `${entDir}/${flow}` : "";
  // status.json holds either a bare string or an object with a status field.
  const raw = status[key];
  const kane = typeof raw === "string" ? raw : (raw && raw.status) || "";
  // Every recorded result predates the rewrite, so a rewritten test's old
  // verdict says nothing about the clone app it now drives.
  const kaneNote = kane && testUpdated === "yes"
    ? "stale — test rewritten against the clone app, needs a fresh run"
    : "";

  out.push([i + 2, uc, entity, ucName, app ? "DONE" : "", link, testUpdated, command, kane, kaneNote]);
  paste.push([app ? "DONE" : "", command, link]);
});

const csvCell = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
fs.writeFileSync(path.join(ROOT, "eval-status-209.csv"),
  out.map((r) => r.map(csvCell).join(",")).join("\n") + "\n");
fs.writeFileSync(path.join(ROOT, "eval-status-paste-J2.tsv"),
  paste.map((r) => r.join("\t")).join("\n") + "\n");

const built = out.slice(1).filter((r) => r[4] === "DONE").length;
const updated = out.slice(1).filter((r) => r[6] === "yes").length;
const entities = new Set(out.slice(1).filter((r) => r[4] === "DONE").map((r) => r[2]));
console.log(`rows ${out.length - 1} | app built ${built} | entities ${entities.size} | tests rewritten ${updated}`);
