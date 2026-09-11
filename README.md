# Real Evals

A living playground of realistic web-app clones for any kind of testing, and the target site for Kane CLI evals.

- **Live:** https://my-testing-repo-main.vercel.app/
- **Full guide to the original clones:** [REAL-EVALS.md](REAL-EVALS.md) (8 industry clones + the Auralis interactive site, every slug and API endpoint)
- **Entity Evals build plan:** [ENTITY-EVALS-PLAN.md](ENTITY-EVALS-PLAN.md)
- **Kane test index:** [tests/INDEX.md](tests/INDEX.md)

## Route map

### Existing clones (unchanged)

| Route | What |
|---|---|
| `/` | Landing page: clone grid + the new Entity Evals section |
| `/bank-clone-app`, `/health-clone-app`, `/shop-clone-app`, `/insurance-clone-app`, `/travel-clone-app`, `/telecom-clone-app`, `/stream-clone-app`, `/gov-clone-app` | Industry clones (see REAL-EVALS.md) |
| `/interactive-website` | Auralis motion-heavy landing page |
| `/cart`, `/checkout`, `/login` | Original demo pages |
| `/api/*` | REST endpoints per clone |

### Entity Evals (new)

50 real-world entities and 209 business-critical flows (every catalog row owned by Bhawana), each a working fictional-skin clone driven by `lib/registry.js`. All 209 are live.

| Route | What |
|---|---|
| `/{entity-slug}` | Entity landing page listing its flows, e.g. `/amazon`, `/stripe`, `/disney-hotstar` |
| `/{entity-slug}/{flow-slug}` | One working flow per catalog use case, e.g. `/amazon/add-to-cart-variant`, `/stripe/3ds-challenge`, `/netflix/profile-pin` |
| `/inbox` | Simulated inbox: every email a flow "sends" (order confirmations, e-sign requests, invites, receipts) |
| `?reset=true` | Restores the flow's seeded state (also available via the Reset button in the eval strip) |
| `?chaos=true` | Slower simulated network (5x delays), a session expiry on the final submit of every form wizard (answers kept, re-auth in place), plus flow-specific failures such as the SuperCoins load error and the slow tab app |

Seeded fixtures (identical in every flow): user `demo@evals.dev / Demo123!`, customer ID `DEMO12345`, OTP `123456`, UPI and profile PIN `1234`, success card `4242 4242 4242 4242`, decline card `4000 0000 0000 0002`, 3-D Secure card `4000 0000 0000 3220`. "Today" is fixed at Monday, September 14, 2026 so dates never drift. State lives in `localStorage` under `ee:{entity}:{flow}`; nothing is shared between runs.

Code layout:

| Path | Purpose |
|---|---|
| `lib/catalog.js` | Raw catalog rows (generated from the sheet by `scripts/gen-registry.py`) |
| `lib/registry.js` | Entity + flow registry: slugs, skins, pattern engine, ship day, URLs, test paths |
| `lib/flow-loaders.js` | `entity/flow` → lazy component loader (one code-split chunk per flow) |
| `lib/state.js`, `lib/seed/`, `lib/inbox.js` | Deterministic state hook and reset handling, seeded fixtures, simulated email |
| `app/[entity]/` | Entity landing + flow route namespace (`dynamicParams = false`, so only registry slugs resolve) |
| `app/entity-flows/{entity}/{flow}.js` | The 209 flow implementations |
| `app/components/engines/` | Pattern engines: `Checkout` + `Store` (checkout), `Auth`, `Wizard`, `Crud` (table + kanban), `Tracker`, `Media`, `Booking`, `Feed`, plus shells (`BankShell`, `TradeShell`, `SaasShell`, `MobileShell`, `Meeting`, `Messenger`, `PaymentPage`) |
| `app/components/eval/` | Eval strip (Reset, badges), UI primitives, skin chrome |
| `tests/{entity}/{flow}_test.md` | One Kane CLI test per flow; `tests/INDEX.md` lists all 209 with status |

### Running the Kane tests

```bash
kane-cli testmd run tests/amazon/add-to-cart-variant_test.md --agent --headless --assertion-mode dom
npm run kane:verify -- --live-unverified   # runs every not-yet-verified test sequentially, updates tests/status.json
npm run gen:tests                          # rebuilds tests/INDEX.md from the registry and status.json
```

Run tests one at a time locally: parallel `testmd run` processes share one Chrome profile. Use `kane-cli testrun run --parallel N` for isolated parallel runs.

Scripts: `npm run gen:registry`, `npm run gen:tests`, `npm run gen:plan`, `npm run kane:verify`.

## External services

| Service | Used for | Notes |
|---|---|---|
| Supabase (free tier) | Magic-link / OTP login on the original `/login` page | Existing project; keys in `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Vercel (free tier) | Hosting, preview deploys per push | GitHub integration |
| LambdaTest / Kane CLI | CI browser runs (`.github/workflows/kane-tests.yml`) | `LT_USERNAME` / `LT_ACCESS_KEY` secrets |

Entity Evals flows are fully self-contained: in-app state, fixed seed data, no network calls and no keys. Payment widgets (Stripely hosted checkout, 3-D Secure, declines, PayPally popups, Razorpaid, Adyenly drop-in and iDEAL, Klarnah), OTP, e-sign, realtime co-editing and email round trips are all simulated in-app so every Kane run is deterministic and repeatable. Stripe test mode and Supabase realtime were deliberately not wired in: both would add keys and shared mutable state that one run could leave behind for the next.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
