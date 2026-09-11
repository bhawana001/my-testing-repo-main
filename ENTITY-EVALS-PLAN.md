# Entity Evals: 14-day build plan

Scope: every catalog row with Owner = Bhawana (rows 2-210) = **50 entities, 209 flows**. Day 1 = 2026-09-11, hard deadline day 14 = 2026-09-24.

## Route namespace (confirmed free)

- Flow pages: `/{entity-slug}/{flow-slug}` (e.g. `/amazon/add-to-cart-variant`, `/stripe/3ds-challenge`, `/netflix/profile-pin`).
- Entity landing pages: `/{entity-slug}` listing that entity's flows.
- Implemented as `app/[entity]/[flow]/page.js` with `dynamicParams=false`, so only registry slugs resolve; every existing route (`/bank-clone-app/*`, `/shop-clone-app/*`, `/cart`, `/checkout`, `/login`, `/interactive-website`, `/api/*`) is a static file route and keeps precedence. No existing file was modified except `app/page.js` (new section appended below the clones grid).
- Every flow honours `?reset=true` and `?chaos=true` and shows a Reset button in the eval strip.
- Tests: `tests/{entity-slug}/{flow-slug}_test.md` (kane-cli requires the `_test.md` suffix, so `.test.md` from the brief becomes `_test.md`).

## Entities

| # | Entity | Skin | Industry | Flows | Landing |
|---|---|---|---|---|---|
| 1 | Amazon | Amazonia | E-commerce | 5 | `/amazon` |
| 2 | Shopify | Shopifly | E-commerce | 5 | `/shopify` |
| 3 | Flipkart | Flipmart | E-commerce | 4 | `/flipkart` |
| 4 | Walmart | Walmartly | E-commerce | 4 | `/walmart` |
| 5 | Etsy | Etsily | E-commerce | 4 | `/etsy` |
| 6 | eBay | eBidz | E-commerce | 4 | `/ebay` |
| 7 | Instacart | Instakart | E-commerce | 4 | `/instacart` |
| 8 | Nike | Nyke | E-commerce | 4 | `/nike` |
| 9 | Stripe | Stripely | Payments infra | 5 | `/stripe` |
| 10 | PayPal | PayPally | Payments infra | 5 | `/paypal` |
| 11 | Razorpay | Razorpaid | Payments infra | 4 | `/razorpay` |
| 12 | Square | Squarely | Payments infra | 4 | `/square` |
| 13 | Adyen | Adyenly | Payments infra | 4 | `/adyen` |
| 14 | Klarna | Klarnah | Payments infra | 4 | `/klarna` |
| 15 | Wise | Wyse | Payments infra | 4 | `/wise` |
| 16 | Robinhood | Robinhoot | Consumer fintech | 5 | `/robinhood` |
| 17 | Zerodha | Zerodhi | Consumer fintech | 4 | `/zerodha` |
| 18 | Coinbase | Coinbayse | Consumer fintech | 4 | `/coinbase` |
| 19 | Revolut | Revolute | Consumer fintech | 4 | `/revolut` |
| 20 | Paytm | Paytum | Consumer fintech | 5 | `/paytm` |
| 21 | PhonePe | PhonePay | Consumer fintech | 4 | `/phonepe` |
| 22 | Venmo | Venmoo | Consumer fintech | 4 | `/venmo` |
| 23 | Chase | Chaise Bank | Banking | 5 | `/chase` |
| 24 | HDFC Bank | HDFB Bank | Banking | 4 | `/hdfc-bank` |
| 25 | American Express | Amerix | Banking | 4 | `/american-express` |
| 26 | Lemonade | Lemonaid | Insurance | 4 | `/lemonade` |
| 27 | Policybazaar | PolicyMart | Insurance | 4 | `/policybazaar` |
| 28 | Salesforce | Salesforze | CRM | 5 | `/salesforce` |
| 29 | HubSpot | HubSpotty | CRM | 4 | `/hubspot` |
| 30 | Zendesk | Zendeskly | Support SaaS | 5 | `/zendesk` |
| 31 | Intercom | Intercomm | Support SaaS | 4 | `/intercom` |
| 32 | Zoho CRM | Zohoo CRM | CRM | 4 | `/zoho-crm` |
| 33 | Freshdesk | Freshdeskly | Support SaaS | 4 | `/freshdesk` |
| 34 | ServiceNow | ServiceNowly | ITSM | 4 | `/servicenow` |
| 35 | Slack | Slacky | Work collab | 5 | `/slack` |
| 36 | Microsoft Teams | Teamz | Work collab | 4 | `/microsoft-teams` |
| 37 | Zoom | Zoomly | Work collab | 4 | `/zoom` |
| 38 | Notion | Notionly | Work collab | 5 | `/notion` |
| 39 | Airtable | Airtably | Work collab | 4 | `/airtable` |
| 40 | Asana | Asanah | Work collab | 4 | `/asana` |
| 41 | Jira | Jirah | Work collab | 4 | `/jira` |
| 42 | Monday.com | Mondayly | Work collab | 4 | `/monday` |
| 43 | DocuSign | DocuSigned | Docs productivity | 4 | `/docusign` |
| 44 | Dropbox | Dropboxy | Docs productivity | 4 | `/dropbox` |
| 45 | Google Drive | Drively | Docs productivity | 4 | `/google-drive` |
| 46 | Calendly | Calendlee | Docs productivity | 4 | `/calendly` |
| 47 | Netflix | Netflixy | Streaming | 5 | `/netflix` |
| 48 | Spotify | Spotifly | Streaming | 4 | `/spotify` |
| 49 | YouTube | YouTubely | Streaming | 4 | `/youtube` |
| 50 | Disney+ Hotstar | Hotstarry | Streaming | 1 | `/disney-hotstar` |

## Pattern engines (app/components/engines)

| Engine | Flows using it |
|---|---|
| Checkout engine (`checkout`) | 43 |
| Auth engine (`auth`) | 7 |
| Form wizard (`wizard`) | 46 |
| CRUD table / board (`crud`) | 55 |
| Tracker timeline (`tracker`) | 7 |
| Media player (`media`) | 10 |
| Booking calendar (`booking`) | 8 |
| Feed / messaging (`feed`) | 12 |
| Custom (`custom`) | 21 |

## Day-by-day

| Day | Date | Flows | Cumulative | Focus |
|---|---|---|---|---|
| 1 | 2026-09-11 | 0 | 0 | Repo inspection, catalog import, registry, route namespace, homepage Entity Evals section, EvalShell + state/reset, design system, test.md generator + INDEX. Plan published. |
| 2 | 2026-09-12 | 8 | 8 | The 8 pattern engines (checkout, auth, form wizard, CRUD table/board, tracker timeline, media player, booking calendar, feed) + seed data. One pilot flow per engine shipped with a verified test.md. |
| 3 | 2026-09-13 | 17 | 25 | Checkout engine batch A: e-commerce carts, variants, coupons, pickup, multi-seller, tips. |
| 4 | 2026-09-14 | 17 | 42 | Checkout engine batch B: payment widgets (hosted checkout, 3DS, declines, UPI, EMI, drop-in, pay-in-4). |
| 5 | 2026-09-15 | 17 | 59 | Auth + transfer wizards: bank portals (2FA/OTP login, transfers, scheduling, disputes, FD, statements). |
| 6 | 2026-09-16 | 17 | 76 | Wallet + P2P skins (mobile web equivalents): UPI, recharge, bills, feeds, split bills, mandates. |
| 7 | 2026-09-17 | 17 | 93 | Trading and crypto: order tickets, portfolios, P&L tables, GTT, recurring buys, alerts; plus Nyke and eBidz leftovers. |
| 8 | 2026-09-18 | 17 | 110 | Form wizards + CRM: insurance quotes and claims, comparison tables, leads, kanban pipelines, reports, screen flows. |
| 9 | 2026-09-19 | 17 | 127 | Support SaaS CRUD: tickets, macros, help center, SLA timers, messenger/bot handoff, imports, blueprints. |
| 10 | 2026-09-20 | 17 | 144 | ITSM + work collab: incidents, approvals, catalog orders, Slacky feed, meetings, waiting rooms, recordings. |
| 11 | 2026-09-21 | 17 | 161 | Docs and boards: Notionly blocks/databases, Airtably grid/kanban/automations, Asanah, Jirah. |
| 12 | 2026-09-22 | 17 | 178 | Boards, e-sign and files: Mondayly, DocuSigned envelopes, Dropboxy and Drively sharing/versions. |
| 13 | 2026-09-23 | 18 | 196 | Booking + media: Calendlee, Netflixy playback/profiles/cancel, Spotifly, YouTubely; Amazonia search and returns. |
| 14 | 2026-09-24 | 13 | 209 | Remaining dashboards/admin flows, full verification pass of all 209 test.md against production, README route map, final deploy. |

### Day 2 · 2026-09-12 · 8 flows

The 8 pattern engines (checkout, auth, form wizard, CRUD table/board, tracker timeline, media player, booking calendar, feed) + seed data. One pilot flow per engine shipped with a verified test.md.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 1.2 | Amazonia | Add to cart with variant | Checkout engine | `/amazon/add-to-cart-variant` |
| 1.4 | Amazonia | Order tracking | Tracker timeline | `/amazon/order-tracking` |
| 23.1 | Chaise Bank | Login with 2FA | Auth engine | `/chase/login-2fa` |
| 26.1 | Lemonaid | Instant quote flow | Form wizard | `/lemonade/instant-quote` |
| 35.1 | Slacky | Message send with thread | Feed / messaging | `/slack/thread-reply` |
| 39.1 | Airtably | Grid record CRUD | CRUD table / board | `/airtable/grid-crud` |
| 46.1 | Calendlee | Event booking as invitee | Booking calendar | `/calendly/invitee-booking` |
| 47.2 | Netflixy | Playback start and resume | Media player | `/netflix/playback-resume` |

### Day 3 · 2026-09-13 · 17 flows

Checkout engine batch A: e-commerce carts, variants, coupons, pickup, multi-seller, tips.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 1.3 | Amazonia | One-click checkout | Checkout engine | `/amazon/one-click-checkout` |
| 2.1 | Shopifly | Storefront guest checkout | Checkout engine | `/shopify/guest-checkout` |
| 2.2 | Shopifly | Discount code application | Checkout engine | `/shopify/discount-code` |
| 2.3 | Shopifly | Checkout extension render | Checkout engine | `/shopify/checkout-extension` |
| 3.2 | Flipmart | Cart with exchange offer | Checkout engine | `/flipkart/cart-exchange-offer` |
| 3.3 | Flipmart | COD checkout | Checkout engine | `/flipkart/cod-checkout` |
| 4.1 | Walmartly | Store pickup selection | Checkout engine | `/walmart/store-pickup` |
| 4.2 | Walmartly | Grocery substitution | Checkout engine | `/walmart/grocery-substitution` |
| 4.3 | Walmartly | Membership upsell | Checkout engine | `/walmart/membership-upsell` |
| 4.4 | Walmartly | Reorder from history | CRUD table / board | `/walmart/reorder-from-history` |
| 5.1 | Etsily | Personalized item purchase | Checkout engine | `/etsy/personalized-item` |
| 5.3 | Etsily | Cart with multiple sellers | Checkout engine | `/etsy/multi-seller-cart` |
| 6.2 | eBidz | Buy It Now checkout | Checkout engine | `/ebay/buy-it-now` |
| 7.1 | Instakart | Multi-store cart | Checkout engine | `/instacart/multi-store-cart` |
| 7.3 | Instakart | Delivery slot checkout | Booking calendar | `/instacart/delivery-slot-checkout` |
| 7.4 | Instakart | Tip adjustment | Checkout engine | `/instacart/tip-adjustment` |
| 8.4 | Nyke | Checkout with saved card | Checkout engine | `/nike/checkout-saved-card` |

### Day 4 · 2026-09-14 · 17 flows

Checkout engine batch B: payment widgets (hosted checkout, 3DS, declines, UPI, EMI, drop-in, pay-in-4).

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 9.1 | Stripely | Hosted Checkout session | Checkout engine | `/stripe/hosted-checkout` |
| 9.2 | Stripely | 3DS challenge | Checkout engine | `/stripe/3ds-challenge` |
| 9.3 | Stripely | Declined card recovery | Checkout engine | `/stripe/declined-card-recovery` |
| 10.1 | PayPally | Express checkout button | Checkout engine | `/paypal/express-checkout` |
| 10.2 | PayPally | Guest card payment | Checkout engine | `/paypal/guest-card-payment` |
| 11.1 | Razorpaid | Standard checkout modal | Checkout engine | `/razorpay/checkout-modal` |
| 11.2 | Razorpaid | UPI intent flow | Checkout engine | `/razorpay/upi-intent` |
| 11.3 | Razorpaid | EMI option display | Checkout engine | `/razorpay/emi-options` |
| 11.4 | Razorpaid | Payment link flow | Checkout engine | `/razorpay/payment-link` |
| 12.1 | Squarely | Online checkout link | Checkout engine | `/square/checkout-link` |
| 12.2 | Squarely | Invoice pay flow | Checkout engine | `/square/invoice-pay` |
| 12.3 | Squarely | Tip and receipt screen | Checkout engine | `/square/tip-and-receipt` |
| 13.1 | Adyenly | Drop-in payment | Checkout engine | `/adyen/drop-in-payment` |
| 13.2 | Adyenly | Local method iDEAL | Checkout engine | `/adyen/ideal-redirect` |
| 13.3 | Adyenly | Stored card reuse | Checkout engine | `/adyen/stored-card-reuse` |
| 14.1 | Klarnah | Pay in 4 selection | Checkout engine | `/klarna/pay-in-4` |
| 14.2 | Klarnah | Credit decision decline path | Checkout engine | `/klarna/credit-decline-fallback` |

### Day 5 · 2026-09-15 · 17 flows

Auth + transfer wizards: bank portals (2FA/OTP login, transfers, scheduling, disputes, FD, statements).

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 15.1 | Wyse | International transfer quote | Form wizard | `/wise/transfer-quote` |
| 15.2 | Wyse | Recipient add and verify | Form wizard | `/wise/add-recipient` |
| 15.3 | Wyse | Transfer status tracking | Tracker timeline | `/wise/transfer-tracking` |
| 15.4 | Wyse | Multi-currency balance conversion | Custom | `/wise/balance-conversion` |
| 19.1 | Revolute | Card freeze unfreeze | Custom | `/revolut/card-freeze` |
| 23.2 | Chaise Bank | Zelle transfer | Form wizard | `/chase/zelle-transfer` |
| 23.3 | Chaise Bank | Bill pay scheduling | Form wizard | `/chase/bill-pay-scheduling` |
| 23.4 | Chaise Bank | Statement download | Custom | `/chase/statement-download` |
| 23.5 | Chaise Bank | Credit card dispute | Form wizard | `/chase/card-dispute` |
| 24.1 | HDFB Bank | NetBanking login | Auth engine | `/hdfc-bank/netbanking-login` |
| 24.2 | HDFB Bank | IMPS transfer | Form wizard | `/hdfc-bank/imps-transfer` |
| 24.3 | HDFB Bank | FD creation | Form wizard | `/hdfc-bank/fd-creation` |
| 24.4 | HDFB Bank | Credit card statement view | CRUD table / board | `/hdfc-bank/card-statement` |
| 25.1 | Amerix | Membership rewards redemption | Form wizard | `/american-express/rewards-redemption` |
| 25.2 | Amerix | Card payment scheduling | Form wizard | `/american-express/payment-scheduling` |
| 25.3 | Amerix | Dispute a charge | Form wizard | `/american-express/dispute-charge` |
| 25.4 | Amerix | Offers enrollment | CRUD table / board | `/american-express/offers-enrollment` |

### Day 6 · 2026-09-16 · 17 flows

Wallet + P2P skins (mobile web equivalents): UPI, recharge, bills, feeds, split bills, mandates.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 14.3 | Klarnah | Order in Klarna app | Tracker timeline | `/klarna/payment-schedule` |
| 19.2 | Revolute | Currency exchange | Custom | `/revolut/currency-exchange` |
| 19.3 | Revolute | Payment split bill | Form wizard | `/revolut/split-bill` |
| 19.4 | Revolute | Savings vault roundup | Custom | `/revolut/savings-vault` |
| 20.1 | Paytum | UPI money transfer | Form wizard | `/paytm/upi-transfer` |
| 20.2 | Paytum | Mobile recharge | Checkout engine | `/paytm/mobile-recharge` |
| 20.3 | Paytum | Bill payment electricity | Checkout engine | `/paytm/electricity-bill` |
| 20.4 | Paytum | Wallet to bank transfer | Form wizard | `/paytm/wallet-to-bank` |
| 20.5 | Paytum | Movie ticket booking | Booking calendar | `/paytm/movie-ticket` |
| 21.1 | PhonePay | UPI QR scan pay | Form wizard | `/phonepe/qr-scan-pay` |
| 21.2 | PhonePay | Autopay mandate setup | Form wizard | `/phonepe/autopay-mandate` |
| 21.3 | PhonePay | Transaction history filter | CRUD table / board | `/phonepe/history-filter` |
| 21.4 | PhonePay | Insurance purchase entry | Form wizard | `/phonepe/bike-insurance-quote` |
| 22.1 | Venmoo | P2P payment with emoji note | Feed / messaging | `/venmo/pay-with-note` |
| 22.2 | Venmoo | Request and remind | Feed / messaging | `/venmo/request-and-remind` |
| 22.3 | Venmoo | Cash out to bank | Form wizard | `/venmo/cash-out` |
| 22.4 | Venmoo | Card transaction feed | Feed / messaging | `/venmo/card-transaction-feed` |

### Day 7 · 2026-09-17 · 17 flows

Trading and crypto: order tickets, portfolios, P&L tables, GTT, recurring buys, alerts; plus Nyke and eBidz leftovers.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 6.1 | eBidz | Bid placement | Custom | `/ebay/bid-placement` |
| 8.1 | Nyke | Size guide and selection | Checkout engine | `/nike/size-guide` |
| 8.2 | Nyke | Member exclusive access | Auth engine | `/nike/member-exclusive` |
| 14.4 | Klarnah | Return adjusts installments | Tracker timeline | `/klarna/return-adjusts-installments` |
| 16.1 | Robinhoot | Market buy order | Custom | `/robinhood/market-buy` |
| 16.2 | Robinhoot | Limit order placement | Custom | `/robinhood/limit-order` |
| 16.3 | Robinhoot | Portfolio value render | CRUD table / board | `/robinhood/portfolio-value` |
| 16.4 | Robinhoot | Instant deposit flow | Form wizard | `/robinhood/instant-deposit` |
| 16.5 | Robinhoot | Options chain display | CRUD table / board | `/robinhood/options-chain` |
| 17.1 | Zerodhi | Kite order placement | Custom | `/zerodha/intraday-order` |
| 17.2 | Zerodhi | GTT trigger creation | Custom | `/zerodha/gtt-trigger` |
| 17.3 | Zerodhi | Holdings P and L | CRUD table / board | `/zerodha/holdings-pnl` |
| 17.4 | Zerodhi | Funds transfer UPI | Form wizard | `/zerodha/funds-upi` |
| 18.1 | Coinbayse | Crypto buy with card | Checkout engine | `/coinbase/crypto-buy` |
| 18.2 | Coinbayse | Recurring buy setup | Form wizard | `/coinbase/recurring-buy` |
| 18.3 | Coinbayse | Send to address flow | Form wizard | `/coinbase/send-to-address` |
| 18.4 | Coinbayse | Price alert creation | CRUD table / board | `/coinbase/price-alert` |

### Day 8 · 2026-09-18 · 17 flows

Form wizards + CRM: insurance quotes and claims, comparison tables, leads, kanban pipelines, reports, screen flows.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 6.3 | eBidz | Best Offer flow | Form wizard | `/ebay/best-offer` |
| 26.2 | Lemonaid | Policy purchase | Checkout engine | `/lemonade/policy-purchase` |
| 26.3 | Lemonaid | Claim filing video flow | Form wizard | `/lemonade/claim-filing` |
| 26.4 | Lemonaid | Coverage adjustment | Form wizard | `/lemonade/coverage-adjustment` |
| 27.1 | PolicyMart | Term insurance comparison | CRUD table / board | `/policybazaar/term-comparison` |
| 27.2 | PolicyMart | Lead form to callback | Form wizard | `/policybazaar/lead-callback` |
| 27.3 | PolicyMart | Health plan filter | CRUD table / board | `/policybazaar/health-plan-filter` |
| 27.4 | PolicyMart | Premium calculator | Custom | `/policybazaar/premium-calculator` |
| 28.1 | Salesforze | Lead creation via LWC form | CRUD table / board | `/salesforce/lead-creation` |
| 28.2 | Salesforze | Opportunity stage move | CRUD table / board | `/salesforce/opportunity-kanban` |
| 28.3 | Salesforze | Report run and filter | CRUD table / board | `/salesforce/report-filter` |
| 28.4 | Salesforze | Record edit through overlay | CRUD table / board | `/salesforce/record-edit-overlay` |
| 28.5 | Salesforze | Flow screen completion | Form wizard | `/salesforce/screen-flow` |
| 29.1 | HubSpotty | Form to contact creation | CRUD table / board | `/hubspot/form-to-contact` |
| 29.2 | HubSpotty | Deal pipeline drag | CRUD table / board | `/hubspot/deal-pipeline-drag` |
| 29.3 | HubSpotty | Email sequence enrollment | CRUD table / board | `/hubspot/sequence-enrollment` |
| 29.4 | HubSpotty | Meeting link booking | Booking calendar | `/hubspot/meeting-link-booking` |

### Day 9 · 2026-09-19 · 17 flows

Support SaaS CRUD: tickets, macros, help center, SLA timers, messenger/bot handoff, imports, blueprints.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 30.1 | Zendeskly | Ticket submission via widget | Form wizard | `/zendesk/widget-ticket` |
| 30.2 | Zendeskly | Agent reply and status | CRUD table / board | `/zendesk/agent-reply-status` |
| 30.3 | Zendeskly | Macro application | CRUD table / board | `/zendesk/macro-application` |
| 30.4 | Zendeskly | Help center search | CRUD table / board | `/zendesk/help-center-search` |
| 30.5 | Zendeskly | SLA breach indicator | Tracker timeline | `/zendesk/sla-breach-indicator` |
| 31.1 | Intercomm | Messenger conversation start | Feed / messaging | `/intercom/messenger-conversation` |
| 31.2 | Intercomm | Bot to human handoff | Feed / messaging | `/intercom/bot-handoff` |
| 31.3 | Intercomm | Article suggestion in chat | Feed / messaging | `/intercom/article-suggestion` |
| 31.4 | Intercomm | Outbound message display | Custom | `/intercom/outbound-message` |
| 32.1 | Zohoo CRM | Lead import mapping | Form wizard | `/zoho-crm/lead-import-mapping` |
| 32.2 | Zohoo CRM | Workflow rule trigger | CRUD table / board | `/zoho-crm/workflow-rule` |
| 32.3 | Zohoo CRM | Blueprint stage transition | Form wizard | `/zoho-crm/blueprint-transition` |
| 32.4 | Zohoo CRM | Dashboard KPI render | CRUD table / board | `/zoho-crm/dashboard-kpi` |
| 33.1 | Freshdeskly | Email to ticket conversion | Custom | `/freshdesk/email-to-ticket` |
| 33.2 | Freshdeskly | Canned response insert | CRUD table / board | `/freshdesk/canned-response` |
| 33.3 | Freshdeskly | Ticket merge | CRUD table / board | `/freshdesk/ticket-merge` |
| 33.4 | Freshdeskly | Customer portal ticket view | Auth engine | `/freshdesk/portal-ticket-view` |

### Day 10 · 2026-09-20 · 17 flows

ITSM + work collab: incidents, approvals, catalog orders, Slacky feed, meetings, waiting rooms, recordings.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 6.4 | eBidz | Seller listing creation | Form wizard | `/ebay/seller-listing` |
| 34.1 | ServiceNowly | Incident creation | CRUD table / board | `/servicenow/incident-creation` |
| 34.2 | ServiceNowly | Approval workflow | Form wizard | `/servicenow/approval-workflow` |
| 34.3 | ServiceNowly | Service catalog order | Form wizard | `/servicenow/catalog-order` |
| 34.4 | ServiceNowly | Knowledge article search | CRUD table / board | `/servicenow/knowledge-search` |
| 35.2 | Slacky | File upload and preview | Feed / messaging | `/slack/file-upload-preview` |
| 35.3 | Slacky | Search across channels | CRUD table / board | `/slack/search-channels` |
| 35.4 | Slacky | Huddle start | Media player | `/slack/huddle-start` |
| 35.5 | Slacky | Workflow form submission | Form wizard | `/slack/workflow-form` |
| 36.1 | Teamz | Meeting join from calendar | Media player | `/microsoft-teams/meeting-join` |
| 36.2 | Teamz | Channel post with mention | Feed / messaging | `/microsoft-teams/mention-notification` |
| 36.3 | Teamz | File coauthor open | Custom | `/microsoft-teams/file-coauthor` |
| 36.4 | Teamz | Tab app load | Custom | `/microsoft-teams/tab-app-load` |
| 37.1 | Zoomly | Meeting schedule with registration | Booking calendar | `/zoom/meeting-registration` |
| 37.2 | Zoomly | Join flow with waiting room | Media player | `/zoom/waiting-room` |
| 37.3 | Zoomly | Screen share | Media player | `/zoom/screen-share` |
| 37.4 | Zoomly | Recording to cloud | Media player | `/zoom/cloud-recording` |

### Day 11 · 2026-09-21 · 17 flows

Docs and boards: Notionly blocks/databases, Airtably grid/kanban/automations, Asanah, Jirah.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 7.2 | Instakart | Replacement preferences | Checkout engine | `/instacart/replacement-preferences` |
| 38.1 | Notionly | Page creation with blocks | Custom | `/notion/page-blocks` |
| 38.2 | Notionly | Database filter and sort | CRUD table / board | `/notion/database-filter-sort` |
| 38.3 | Notionly | Share to web publish | Custom | `/notion/share-to-web` |
| 38.4 | Notionly | Template duplication | CRUD table / board | `/notion/template-duplication` |
| 38.5 | Notionly | Comment and mention | Feed / messaging | `/notion/comment-mention` |
| 39.2 | Airtably | Form view submission | Form wizard | `/airtable/form-view-submission` |
| 39.3 | Airtably | Kanban stage drag | CRUD table / board | `/airtable/kanban-drag` |
| 39.4 | Airtably | Automation run | CRUD table / board | `/airtable/automation-run` |
| 40.1 | Asanah | Task creation with assignee | CRUD table / board | `/asana/task-creation` |
| 40.2 | Asanah | Project board move | CRUD table / board | `/asana/board-move` |
| 40.3 | Asanah | Subtask and dependency | CRUD table / board | `/asana/subtask-dependency` |
| 40.4 | Asanah | My Tasks sort | CRUD table / board | `/asana/my-tasks-sort` |
| 41.1 | Jirah | Issue creation with fields | CRUD table / board | `/jira/issue-creation` |
| 41.2 | Jirah | Sprint board drag | CRUD table / board | `/jira/sprint-board-drag` |
| 41.3 | Jirah | JQL filter search | CRUD table / board | `/jira/jql-filter` |
| 41.4 | Jirah | Workflow transition validation | CRUD table / board | `/jira/transition-validation` |

### Day 12 · 2026-09-22 · 17 flows

Boards, e-sign and files: Mondayly, DocuSigned envelopes, Dropboxy and Drively sharing/versions.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 8.3 | Nyke | SNKRS draw entry | Custom | `/nike/snkrs-draw` |
| 42.1 | Mondayly | Board item creation | CRUD table / board | `/monday/board-item` |
| 42.2 | Mondayly | Automation recipe | CRUD table / board | `/monday/automation-recipe` |
| 42.3 | Mondayly | Dashboard widget | CRUD table / board | `/monday/dashboard-widget` |
| 42.4 | Mondayly | Guest board sharing | Auth engine | `/monday/guest-board-sharing` |
| 43.1 | DocuSigned | Envelope send for signature | Form wizard | `/docusign/envelope-send` |
| 43.2 | DocuSigned | Signing ceremony completion | Form wizard | `/docusign/signing-ceremony` |
| 43.3 | DocuSigned | Template reuse | Form wizard | `/docusign/template-reuse` |
| 43.4 | DocuSigned | Decline and void handling | Tracker timeline | `/docusign/decline-void` |
| 44.1 | Dropboxy | File upload and share link | CRUD table / board | `/dropbox/upload-share-link` |
| 44.2 | Dropboxy | Folder permission change | CRUD table / board | `/dropbox/folder-permission` |
| 44.3 | Dropboxy | File request flow | Form wizard | `/dropbox/file-request` |
| 44.4 | Dropboxy | Version history restore | CRUD table / board | `/dropbox/version-history` |
| 45.1 | Drively | Doc share with permission levels | CRUD table / board | `/google-drive/share-permission-levels` |
| 45.2 | Drively | Real-time coedit | Custom | `/google-drive/realtime-coedit` |
| 45.3 | Drively | Search across drive | CRUD table / board | `/google-drive/drive-search` |
| 45.4 | Drively | Offline mode edit sync | Custom | `/google-drive/offline-sync` |

### Day 13 · 2026-09-23 · 18 flows

Booking + media: Calendlee, Netflixy playback/profiles/cancel, Spotifly, YouTubely; Amazonia search and returns.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 1.1 | Amazonia | Search to product page | CRUD table / board | `/amazon/search-to-product` |
| 1.5 | Amazonia | Return initiation | Form wizard | `/amazon/return-initiation` |
| 46.2 | Calendlee | Availability rules respected | Booking calendar | `/calendly/availability-rules` |
| 46.3 | Calendlee | Reschedule flow | Booking calendar | `/calendly/reschedule` |
| 46.4 | Calendlee | Payment collection booking | Booking calendar | `/calendly/paid-booking` |
| 47.1 | Netflixy | Signup with plan selection | Checkout engine | `/netflix/signup-plan` |
| 47.3 | Netflixy | Profile switch with PIN | Auth engine | `/netflix/profile-pin` |
| 47.4 | Netflixy | Download for offline | Media player | `/netflix/offline-download` |
| 47.5 | Netflixy | Cancel and rejoin | Form wizard | `/netflix/cancel-rejoin` |
| 48.1 | Spotifly | Premium upgrade flow | Checkout engine | `/spotify/premium-upgrade` |
| 48.2 | Spotifly | Playlist create and add | Media player | `/spotify/playlist-create` |
| 48.3 | Spotifly | Cross-device continue | Media player | `/spotify/cross-device-continue` |
| 48.4 | Spotifly | Family plan invite | Form wizard | `/spotify/family-invite` |
| 49.1 | YouTubely | Video upload and process | Form wizard | `/youtube/video-upload` |
| 49.2 | YouTubely | Comment and moderation | Feed / messaging | `/youtube/comment-pin` |
| 49.3 | YouTubely | Premium background play | Auth engine | `/youtube/background-play-entitlement` |
| 49.4 | YouTubely | Channel membership join | Checkout engine | `/youtube/channel-membership` |
| 50.1 | Hotstarry | Live sports playback | Media player | `/disney-hotstar/live-sports-playback` |

### Day 14 · 2026-09-24 · 13 flows

Remaining dashboards/admin flows, full verification pass of all 209 test.md against production, README route map, final deploy.

| UC | Skin | Use case | Engine | Route |
|---|---|---|---|---|
| 2.4 | Shopifly | Admin order creation | CRUD table / board | `/shopify/admin-order-creation` |
| 2.5 | Shopifly | Theme update smoke | Checkout engine | `/shopify/theme-update-smoke` |
| 3.1 | Flipmart | Search with filters | CRUD table / board | `/flipkart/search-with-filters` |
| 3.4 | Flipmart | SuperCoins balance | Custom | `/flipkart/supercoins-balance` |
| 5.2 | Etsily | Shop search and favorite | CRUD table / board | `/etsy/shop-search-favorite` |
| 5.4 | Etsily | Review submission | Feed / messaging | `/etsy/review-submission` |
| 9.4 | Stripely | Billing portal update | CRUD table / board | `/stripe/billing-portal` |
| 9.5 | Stripely | Dashboard payment lookup | CRUD table / board | `/stripe/dashboard-payment-lookup` |
| 10.3 | PayPally | Send money P2P | Form wizard | `/paypal/send-money` |
| 10.4 | PayPally | Dispute filing | Form wizard | `/paypal/dispute-filing` |
| 10.5 | PayPally | Currency conversion display | Form wizard | `/paypal/currency-conversion` |
| 12.4 | Squarely | Refund from dashboard | CRUD table / board | `/square/refund-dashboard` |
| 13.4 | Adyenly | Payment status webhook parity | Tracker timeline | `/adyen/webhook-status-parity` |

## Industries

E-commerce (8) · Payments infra (7) · Consumer fintech (7) · Banking (3) · Insurance (2) · CRM (3) · Support SaaS (3) · ITSM (1) · Work collab (8) · Docs productivity (4) · Streaming (4)
