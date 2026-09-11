import json, re
import os; rows = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "catalog-rows.json")))[:208]
import os; ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# slug, skin, icon, accent, accent2, mode(light|dark), tagline
ENT = {
 1:("amazon","Amazonia","📦","#f59e0b","#131921","light","Everything store"),
 2:("shopify","Shopifly","🛍️","#5c6ac4","#0f172a","light","Storefront + admin"),
 3:("flipkart","Flipmart","🛒","#2874f0","#fb641b","light","India's marketplace"),
 4:("walmart","Walmartly","🏬","#0071dc","#ffc220","light","Save money. Live better."),
 5:("etsy","Etsily","🧶","#f1641e","#222222","light","Handmade marketplace"),
 6:("ebay","eBidz","🔨","#e53238","#0064d2","light","Auctions and Buy It Now"),
 7:("instacart","Instakart","🥕","#0aad0a","#003d29","light","Grocery delivery"),
 8:("nike","Nyke","👟","#111111","#fa5400","light","Just move."),
 9:("stripe","Stripely","💳","#635bff","#0a2540","light","Payments infrastructure"),
 10:("paypal","PayPally","🅿️","#003087","#0070ba","light","Send, receive, pay"),
 11:("razorpay","Razorpaid","⚡","#3395ff","#0b2447","light","Indian payment gateway"),
 12:("square","Squarely","◼️","#006aff","#1a1a1a","light","POS, invoices, checkout"),
 13:("adyen","Adyenly","🟢","#0abf53","#00112c","light","Global payments platform"),
 14:("klarna","Klarnah","🩷","#ffb3c7","#17120f","light","Pay in 4"),
 15:("wise","Wyse","🌍","#9fe870","#163300","light","International money transfer"),
 16:("robinhood","Robinhoot","🪶","#00c805","#1b1b1d","dark","Commission-free investing"),
 17:("zerodha","Zerodhi","📈","#387ed1","#ff5722","light","Kite-style trading terminal"),
 18:("coinbase","Coinbayse","🪙","#0052ff","#0a0b0d","light","Crypto exchange"),
 19:("revolut","Revolute","💠","#191c1f","#4f55f1","dark","All-in-one money app"),
 20:("paytm","Paytum","📱","#002e6e","#00b9f1","light","UPI wallet super-app"),
 21:("phonepe","PhonePay","💜","#5f259f","#ffffff","light","UPI payments app"),
 22:("venmo","Venmoo","💸","#008cff","#0074de","light","Social payments"),
 23:("chase","Chaise Bank","🏦","#117aca","#0b2e4f","light","Retail bank portal"),
 24:("hdfc-bank","HDFB Bank","🏛️","#004c8f","#ed232a","light","NetBanking portal"),
 25:("american-express","Amerix","💎","#006fcf","#0b1f3a","light","Premium card membership"),
 26:("lemonade","Lemonaid","🍋","#ff0083","#111111","light","Chat-first insurance"),
 27:("policybazaar","PolicyMart","🛡️","#0065ff","#f7b500","light","Insurance comparison"),
 28:("salesforce","Salesforze","☁️","#0176d3","#032d60","light","Lightning CRM"),
 29:("hubspot","HubSpotty","🟠","#ff7a59","#33475b","light","CRM + marketing hub"),
 30:("zendesk","Zendeskly","🎧","#03363d","#17494d","light","Support desk"),
 31:("intercom","Intercomm","💬","#1f8ded","#0b1f33","light","Customer messenger"),
 32:("zoho-crm","Zohoo CRM","🧩","#e42527","#226db4","light","Business CRM suite"),
 33:("freshdesk","Freshdeskly","🌿","#25c16f","#12344d","light","Helpdesk"),
 34:("servicenow","ServiceNowly","🛠️","#62d84e","#032d42","light","ITSM portal"),
 35:("slack","Slacky","#️⃣","#4a154b","#36c5f0","light","Team messaging"),
 36:("microsoft-teams","Teamz","👥","#5b5fc7","#242424","light","Meetings and chat"),
 37:("zoom","Zoomly","🎥","#0b5cff","#232333","light","Video meetings"),
 38:("notion","Notionly","📝","#191919","#f5f5f5","light","Docs and databases"),
 39:("airtable","Airtably","🗂️","#fcb400","#18bfff","light","Spreadsheet-database"),
 40:("asana","Asanah","✅","#f06a6a","#1e1f21","light","Work management"),
 41:("jira","Jirah","🐞","#0052cc","#172b4d","light","Issue tracking"),
 42:("monday","Mondayly","🟣","#6161ff","#ff3d57","light","Work OS boards"),
 43:("docusign","DocuSigned","✍️","#4c00ff","#191823","light","E-signature"),
 44:("dropbox","Dropboxy","📁","#0061ff","#1e1919","light","Cloud file storage"),
 45:("google-drive","Drively","🗃️","#1a73e8","#34a853","light","Docs and drive"),
 46:("calendly","Calendlee","📅","#006bff","#0b3558","light","Scheduling links"),
 47:("netflix","Netflixy","🎬","#e50914","#141414","dark","Streaming"),
 48:("spotify","Spotifly","🎵","#1db954","#121212","dark","Music streaming"),
 49:("youtube","YouTubely","▶️","#ff0000","#0f0f0f","light","Video platform"),
}

# uc -> (flow slug, pattern, day)
FM = {
"1.1":("search-to-product","crud",13),"1.2":("add-to-cart-variant","checkout",2),"1.3":("one-click-checkout","checkout",3),"1.4":("order-tracking","tracker",2),"1.5":("return-initiation","wizard",13),
"2.1":("guest-checkout","checkout",3),"2.2":("discount-code","checkout",3),"2.3":("checkout-extension","checkout",3),"2.4":("admin-order-creation","crud",14),"2.5":("theme-update-smoke","checkout",14),
"3.1":("search-with-filters","crud",14),"3.2":("cart-exchange-offer","checkout",3),"3.3":("cod-checkout","checkout",3),"3.4":("supercoins-balance","custom",14),
"4.1":("store-pickup","checkout",3),"4.2":("grocery-substitution","checkout",3),"4.3":("membership-upsell","checkout",3),"4.4":("reorder-from-history","crud",3),
"5.1":("personalized-item","checkout",3),"5.2":("shop-search-favorite","crud",14),"5.3":("multi-seller-cart","checkout",3),"5.4":("review-submission","feed",14),
"6.1":("bid-placement","custom",7),"6.2":("buy-it-now","checkout",3),"6.3":("best-offer","wizard",8),"6.4":("seller-listing","wizard",10),
"7.1":("multi-store-cart","checkout",3),"7.2":("replacement-preferences","checkout",11),"7.3":("delivery-slot-checkout","booking",3),"7.4":("tip-adjustment","checkout",3),
"8.1":("size-guide","checkout",7),"8.2":("member-exclusive","auth",7),"8.3":("snkrs-draw","custom",12),"8.4":("checkout-saved-card","checkout",3),
"9.1":("hosted-checkout","checkout",4),"9.2":("3ds-challenge","checkout",4),"9.3":("declined-card-recovery","checkout",4),"9.4":("billing-portal","crud",14),"9.5":("dashboard-payment-lookup","crud",14),
"10.1":("express-checkout","checkout",4),"10.2":("guest-card-payment","checkout",4),"10.3":("send-money","wizard",14),"10.4":("dispute-filing","wizard",14),"10.5":("currency-conversion","wizard",14),
"11.1":("checkout-modal","checkout",4),"11.2":("upi-intent","checkout",4),"11.3":("emi-options","checkout",4),"11.4":("payment-link","checkout",4),
"12.1":("checkout-link","checkout",4),"12.2":("invoice-pay","checkout",4),"12.3":("tip-and-receipt","checkout",4),"12.4":("refund-dashboard","crud",14),
"13.1":("drop-in-payment","checkout",4),"13.2":("ideal-redirect","checkout",4),"13.3":("stored-card-reuse","checkout",4),"13.4":("webhook-status-parity","tracker",14),
"14.1":("pay-in-4","checkout",4),"14.2":("credit-decline-fallback","checkout",4),"14.3":("payment-schedule","tracker",6),"14.4":("return-adjusts-installments","tracker",7),
"15.1":("transfer-quote","wizard",5),"15.2":("add-recipient","wizard",5),"15.3":("transfer-tracking","tracker",5),"15.4":("balance-conversion","custom",5),
"16.1":("market-buy","custom",7),"16.2":("limit-order","custom",7),"16.3":("portfolio-value","crud",7),"16.4":("instant-deposit","wizard",7),"16.5":("options-chain","crud",7),
"17.1":("intraday-order","custom",7),"17.2":("gtt-trigger","custom",7),"17.3":("holdings-pnl","crud",7),"17.4":("funds-upi","wizard",7),
"18.1":("crypto-buy","checkout",7),"18.2":("recurring-buy","wizard",7),"18.3":("send-to-address","wizard",7),"18.4":("price-alert","crud",7),
"19.1":("card-freeze","custom",5),"19.2":("currency-exchange","custom",6),"19.3":("split-bill","wizard",6),"19.4":("savings-vault","custom",6),
"20.1":("upi-transfer","wizard",6),"20.2":("mobile-recharge","checkout",6),"20.3":("electricity-bill","checkout",6),"20.4":("wallet-to-bank","wizard",6),"20.5":("movie-ticket","booking",6),
"21.1":("qr-scan-pay","wizard",6),"21.2":("autopay-mandate","wizard",6),"21.3":("history-filter","crud",6),"21.4":("bike-insurance-quote","wizard",6),
"22.1":("pay-with-note","feed",6),"22.2":("request-and-remind","feed",6),"22.3":("cash-out","wizard",6),"22.4":("card-transaction-feed","feed",6),
"23.1":("login-2fa","auth",2),"23.2":("zelle-transfer","wizard",5),"23.3":("bill-pay-scheduling","wizard",5),"23.4":("statement-download","custom",5),"23.5":("card-dispute","wizard",5),
"24.1":("netbanking-login","auth",5),"24.2":("imps-transfer","wizard",5),"24.3":("fd-creation","wizard",5),"24.4":("card-statement","crud",5),
"25.1":("rewards-redemption","wizard",5),"25.2":("payment-scheduling","wizard",5),"25.3":("dispute-charge","wizard",5),"25.4":("offers-enrollment","crud",5),
"26.1":("instant-quote","wizard",2),"26.2":("policy-purchase","checkout",8),"26.3":("claim-filing","wizard",8),"26.4":("coverage-adjustment","wizard",8),
"27.1":("term-comparison","crud",8),"27.2":("lead-callback","wizard",8),"27.3":("health-plan-filter","crud",8),"27.4":("premium-calculator","custom",8),
"28.1":("lead-creation","crud",8),"28.2":("opportunity-kanban","crud",8),"28.3":("report-filter","crud",8),"28.4":("record-edit-overlay","crud",8),"28.5":("screen-flow","wizard",8),
"29.1":("form-to-contact","crud",8),"29.2":("deal-pipeline-drag","crud",8),"29.3":("sequence-enrollment","crud",8),"29.4":("meeting-link-booking","booking",8),
"30.1":("widget-ticket","wizard",9),"30.2":("agent-reply-status","crud",9),"30.3":("macro-application","crud",9),"30.4":("help-center-search","crud",9),"30.5":("sla-breach-indicator","tracker",9),
"31.1":("messenger-conversation","feed",9),"31.2":("bot-handoff","feed",9),"31.3":("article-suggestion","feed",9),"31.4":("outbound-message","custom",9),
"32.1":("lead-import-mapping","wizard",9),"32.2":("workflow-rule","crud",9),"32.3":("blueprint-transition","wizard",9),"32.4":("dashboard-kpi","crud",9),
"33.1":("email-to-ticket","custom",9),"33.2":("canned-response","crud",9),"33.3":("ticket-merge","crud",9),"33.4":("portal-ticket-view","auth",9),
"34.1":("incident-creation","crud",10),"34.2":("approval-workflow","wizard",10),"34.3":("catalog-order","wizard",10),"34.4":("knowledge-search","crud",10),
"35.1":("thread-reply","feed",2),"35.2":("file-upload-preview","feed",10),"35.3":("search-channels","crud",10),"35.4":("huddle-start","media",10),"35.5":("workflow-form","wizard",10),
"36.1":("meeting-join","media",10),"36.2":("mention-notification","feed",10),"36.3":("file-coauthor","custom",10),"36.4":("tab-app-load","custom",10),
"37.1":("meeting-registration","booking",10),"37.2":("waiting-room","media",10),"37.3":("screen-share","media",10),"37.4":("cloud-recording","media",10),
"38.1":("page-blocks","custom",11),"38.2":("database-filter-sort","crud",11),"38.3":("share-to-web","custom",11),"38.4":("template-duplication","crud",11),"38.5":("comment-mention","feed",11),
"39.1":("grid-crud","crud",2),"39.2":("form-view-submission","wizard",11),"39.3":("kanban-drag","crud",11),"39.4":("automation-run","crud",11),
"40.1":("task-creation","crud",11),"40.2":("board-move","crud",11),"40.3":("subtask-dependency","crud",11),"40.4":("my-tasks-sort","crud",11),
"41.1":("issue-creation","crud",11),"41.2":("sprint-board-drag","crud",11),"41.3":("jql-filter","crud",11),"41.4":("transition-validation","crud",11),
"42.1":("board-item","crud",12),"42.2":("automation-recipe","crud",12),"42.3":("dashboard-widget","crud",12),"42.4":("guest-board-sharing","auth",12),
"43.1":("envelope-send","wizard",12),"43.2":("signing-ceremony","wizard",12),"43.3":("template-reuse","wizard",12),"43.4":("decline-void","tracker",12),
"44.1":("upload-share-link","crud",12),"44.2":("folder-permission","crud",12),"44.3":("file-request","wizard",12),"44.4":("version-history","crud",12),
"45.1":("share-permission-levels","crud",12),"45.2":("realtime-coedit","custom",12),"45.3":("drive-search","crud",12),"45.4":("offline-sync","custom",12),
"46.1":("invitee-booking","booking",2),"46.2":("availability-rules","booking",13),"46.3":("reschedule","booking",13),"46.4":("paid-booking","booking",13),
"47.1":("signup-plan","checkout",13),"47.2":("playback-resume","media",2),"47.3":("profile-pin","auth",13),"47.4":("offline-download","media",13),"47.5":("cancel-rejoin","wizard",13),
"48.1":("premium-upgrade","checkout",13),"48.2":("playlist-create","media",13),"48.3":("cross-device-continue","media",13),"48.4":("family-invite","wizard",13),
"49.1":("video-upload","wizard",13),"49.2":("comment-pin","feed",13),"49.3":("background-play-entitlement","auth",13),"49.4":("channel-membership","checkout",13),
}
assert len(FM)==208, len(FM)
from collections import Counter
days=Counter(v[2] for v in FM.values()); print(sorted(days.items()))
pats=Counter(v[1] for v in FM.values()); print(pats)
slugs=set(); 
for uc,(s,p,d) in FM.items():
    e=uc.split(".")[0]; assert (e,s) not in slugs; slugs.add((e,s))

def js(s): return json.dumps(s, ensure_ascii=False)

cat=[]
for r in rows:
    cat.append({"entityNo":int(r[0]),"entity":r[1],"industry":r[2],"uc":r[3],"useCase":r[4],"why":r[5],"objective":r[6],"assertion":r[7]})
with open(f"{ROOT}/lib/catalog.js","w") as f:
    f.write("// AUTO-GENERATED from the Kane CLI real-evals catalog sheet (rows 2-209, owner Bhawana).\n")
    f.write("// Do not edit by hand; regenerate with scripts/gen-registry.py if the sheet changes.\n")
    f.write("/** @typedef {{entityNo:number, entity:string, industry:string, uc:string, useCase:string, why:string, objective:string, assertion:string}} CatalogRow */\n")
    f.write("/** @type {CatalogRow[]} */\nexport const CATALOG = [\n")
    for c in cat: f.write("  "+json.dumps(c,ensure_ascii=False)+",\n")
    f.write("];\n")

with open(f"{ROOT}/lib/registry.js","w") as f:
    f.write('''// Entity Evals registry: 49 entities / 208 flows (catalog rows 2-209).
// Merges the raw catalog (lib/catalog.js) with routing, skin, pattern-engine and
// schedule metadata. Drives the homepage "Entity Evals" section, the
// /{entity}/{flow} routes, entity landing pages and test.md generation.
import { CATALOG } from "./catalog";

export const SITE_URL = "https://my-testing-repo-main.vercel.app";

/**
 * @typedef {"checkout"|"auth"|"wizard"|"crud"|"tracker"|"media"|"booking"|"feed"|"custom"} Pattern
 * @typedef {{no:number, slug:string, name:string, skin:string, industry:string, icon:string,
 *   accent:string, accent2:string, mode:"light"|"dark", tagline:string}} Entity
 * @typedef {import("./catalog").CatalogRow & {
 *   entitySlug:string, skin:string, slug:string, path:string, url:string, testPath:string,
 *   pattern:Pattern, day:number, skinObjective:string, skinAssertion:string, mobile:boolean }} Flow
 */

export const PATTERN_LABELS = {
  checkout: "Checkout engine",
  auth: "Auth engine",
  wizard: "Form wizard",
  crud: "CRUD table / board",
  tracker: "Tracker timeline",
  media: "Media player",
  booking: "Booking calendar",
  feed: "Feed / messaging",
  custom: "Custom",
};

/** @type {Entity[]} */
export const ENTITIES = [
''')
    for no,(slug,skin,icon,a,a2,mode,tag) in ENT.items():
        ind = next(c["industry"] for c in cat if c["entityNo"]==no)
        name = next(c["entity"] for c in cat if c["entityNo"]==no)
        f.write(f"  {{ no: {no}, slug: {js(slug)}, name: {js(name)}, skin: {js(skin)}, industry: {js(ind)}, icon: {js(icon)}, accent: {js(a)}, accent2: {js(a2)}, mode: {js(mode)}, tagline: {js(tag)} }},\n")
    f.write("];\n\n// use-case number -> [flow slug, pattern engine, ship day]\n/** @type {Record<string,[string,Pattern,number]>} */\nconst FLOW_META = {\n")
    for uc,(s,p,d) in FM.items():
        f.write(f"  {js(uc)}: [{js(s)}, {js(p)}, {d}],\n")
    f.write('''};

// Real brand names -> thin fictional skin names, applied to objectives/assertions.
const BRAND_MAP = [
  ["Walmart+", "Walmartly+"], ["Amazon", "Amazonia"], ["Shopify", "Shopifly"], ["Flipkart", "Flipmart"],
  ["SuperCoins", "SuperCoins"], ["Walmart", "Walmartly"], ["Etsy", "Etsily"], ["eBay", "eBidz"],
  ["Instacart", "Instakart"], ["SNKRS", "SNKRZ"], ["Nike", "Nyke"], ["Stripe Checkout", "Stripely Checkout"],
  ["Stripe", "Stripely"], ["PayPal", "PayPally"], ["Razorpay", "Razorpaid"], ["Square", "Squarely"],
  ["Adyen", "Adyenly"], ["Klarna app", "Klarnah app"], ["Klarna", "Klarnah"], ["Wise", "Wyse"],
  ["Robinhood", "Robinhoot"], ["Kite", "Kyte"], ["Zerodha", "Zerodhi"], ["Coinbase", "Coinbayse"],
  ["Revolut", "Revolute"], ["Paytm", "Paytum"], ["PhonePe", "PhonePay"], ["Venmo", "Venmoo"],
  ["Zelle", "Zelly"], ["Chase", "Chaise"], ["HDFC", "HDFB"], ["American Express", "Amerix"],
  ["Membership Rewards", "Membership Rewards"], ["Lemonade", "Lemonaid"], ["Policybazaar", "PolicyMart"],
  ["Salesforce", "Salesforze"], ["Lightning", "Lightning"], ["LWC", "LWC"], ["HubSpot", "HubSpotty"],
  ["Zendesk", "Zendeskly"], ["Intercom", "Intercomm"], ["Zoho", "Zohoo"], ["Freshdesk", "Freshdeskly"],
  ["ServiceNow", "ServiceNowly"], ["RITM", "RITM"], ["Slack", "Slacky"], ["Teams", "Teamz"],
  ["Zoom", "Zoomly"], ["Notion", "Notionly"], ["Airtable", "Airtably"], ["Asana", "Asanah"],
  ["Jira", "Jirah"], ["JQL", "JQL"], ["Monday", "Mondayly"], ["DocuSign", "DocuSigned"],
  ["Dropbox", "Dropboxy"], ["Google Drive", "Drively"], ["Calendly", "Calendlee"], ["Netflix", "Netflixy"],
  ["Spotify", "Spotifly"], ["YouTube", "YouTubely"],
];
const BRAND_RE = new RegExp(
  BRAND_MAP.map(([a]) => a.replace(/[+.]/g, "\\\\$&")).sort((x, y) => y.length - x.length).join("|"),
  "g"
);
const BRAND_LOOKUP = Object.fromEntries(BRAND_MAP);
/** Single-pass brand -> skin substitution (longest match first, no re-matching). */
export function skinText(s) {
  return String(s).replace(BRAND_RE, (m) => BRAND_LOOKUP[m] ?? m);
}

const MOBILE_UC = new Set(["2.5", "20.1", "20.2", "20.3", "20.4", "20.5", "21.1", "21.2", "21.3", "21.4", "22.1", "22.2", "22.3", "22.4", "19.1", "19.2", "19.3", "19.4", "47.4", "48.3", "49.3"]);

/** @type {Flow[]} */
export const FLOWS = CATALOG.map((row) => {
  const ent = ENTITIES.find((e) => e.no === row.entityNo);
  const [slug, pattern, day] = FLOW_META[row.uc];
  const path = `/${ent.slug}/${slug}`;
  return {
    ...row,
    entitySlug: ent.slug,
    skin: ent.skin,
    slug,
    pattern,
    day,
    path,
    url: SITE_URL + path,
    testPath: `tests/${ent.slug}/${slug}_test.md`,
    skinObjective: skinText(row.objective),
    skinAssertion: skinText(row.assertion),
    mobile: MOBILE_UC.has(row.uc),
  };
});

export const INDUSTRIES = [...new Set(ENTITIES.map((e) => e.industry))];

export function getEntity(slug) {
  return ENTITIES.find((e) => e.slug === slug) || null;
}
export function getFlowsForEntity(slug) {
  return FLOWS.filter((f) => f.entitySlug === slug);
}
export function getFlow(entitySlug, flowSlug) {
  return FLOWS.find((f) => f.entitySlug === entitySlug && f.slug === flowSlug) || null;
}
export function flowKey(f) {
  return `${f.entitySlug}/${f.slug}`;
}
''')
print("written")
