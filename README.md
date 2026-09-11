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

50 real-world entities, 209 business-critical flows, each a working fictional-skin clone driven by `lib/registry.js`.

| Route | What |
|---|---|
| `/{entity-slug}` | Entity landing page listing its flows, e.g. `/amazon`, `/stripe`, `/disney-hotstar` |
| `/{entity-slug}/{flow-slug}` | One working flow per catalog use case, e.g. `/amazon/add-to-cart-variant`, `/stripe/3ds-challenge`, `/netflix/profile-pin` |
| `?reset=true` | Restores the flow's seeded state (also available via the Reset button in the eval strip) |
| `?chaos=true` | Slow skeletons, double-submit races and session-expiry paths where a flow supports them |

Seeded fixtures (identical in every flow): user `demo@evals.dev / Demo123!`, OTP `123456`, success card `4242 4242 4242 4242`, decline card `4000 0000 0000 0002`. State lives in `localStorage` under `ee:{entity}:{flow}`; nothing is shared between runs.

Code layout:

| Path | Purpose |
|---|---|
| `lib/catalog.js` | Raw catalog rows (generated from the sheet by `scripts/gen-registry.py`) |
| `lib/registry.js` | Typed entity + flow registry: slugs, skins, pattern engine, ship day, URLs, test paths |
| `lib/flow-loaders.js` | `entity/flow` → lazy component loader; a flow is live once listed here |
| `lib/state.js`, `lib/seed/` | Deterministic state hook, reset handling, seeded fixtures |
| `app/[entity]/` | Entity landing + flow route namespace |
| `app/entity-flows/{entity}/{flow}.js` | Flow implementations (skins of the pattern engines) |
| `app/components/engines/` | Shared pattern engines: checkout, auth, form wizard, CRUD table/board, tracker timeline, media player, booking calendar, feed |
| `app/components/eval/` | Eval strip (Reset, badges), UI primitives, skin chrome |
| `tests/{entity}/{flow}_test.md` | One Kane CLI test per flow (`node scripts/gen-tests.mjs` creates missing drafts and rebuilds `tests/INDEX.md`) |

Scripts: `npm run gen:registry`, `npm run gen:tests`, `npm run gen:plan`.

## External services

| Service | Used for | Notes |
|---|---|---|
| Supabase (free tier) | Magic-link / OTP login on the original `/login` page | Existing project; keys in `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Vercel (free tier) | Hosting, preview deploys per push | GitHub integration |
| LambdaTest / Kane CLI | CI browser runs (`.github/workflows/kane-tests.yml`) | `LT_USERNAME` / `LT_ACCESS_KEY` secrets |

Entity Evals flows are self-contained by default (in-app state, JSON seed data). Payment widgets, 3DS challenges, OTP and email round trips are simulated in-app (an `/inbox`-style panel shows "sent" emails) so every run is deterministic and needs no paid keys.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
