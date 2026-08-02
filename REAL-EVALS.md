# Real Evals — Complete Guide

A living playground of realistic web-app clones for **any kind of testing**: functional, end-to-end, UI and visual regression, browser automation, API, performance, and accessibility. Built so QA engineers, developers, SDETs, and API testers can practice real scenarios on production-looking apps instead of toy pages.

- **Live:** https://my-testing-repo-main.vercel.app/
- **Source:** https://github.com/bhawana001/my-testing-repo-main

This single document contains everything: the clones, every slug and API endpoint, how to drive them with kane-cli, and the 12 use cases with their prompts, target audiences, and ready-to-post social captions.

---

## Table of contents

1. What is Real Evals
2. The 8 industry clones
3. All slugs (pages and APIs)
4. API design (consistent across every app)
5. Running kane-cli (with and without `--agent`)
6. The 12 use cases (audience, task, prompt, caption)
7. Quick reference: audience by industry

---

## 1. What is Real Evals

Real Evals is a set of production-looking clones across 8 industries. Each clone has real UI flows **and** live REST API endpoints, so you can exercise real test scenarios instead of toy pages. It is not tied to one kind of testing. Use it for functional and end-to-end flows, UI and visual regression, browser automation (kane-cli, Playwright, Selenium, Cypress), API testing, performance, and accessibility, whether manual or automated.

Anyone can use it: drive the live UI, hit the APIs directly, clone the repo, run `npm run dev`, and open any app locally, or add your own industry.

Alongside the eight clones there is one **interactive site**, Auralis (`/interactive-website`) — a
motion-heavy product landing page with no API, there to exercise scroll-driven animation, canvas,
parallax, pinned sections, and visual regression. See section 2.

Every clone carries a small "Clone list" pill (bottom-left) that returns to the landing page.

---

## 2. The 8 industry clones

| # | Industry | Brand (clone of) | Slug |
|---|---|---|---|
| 1 | Banking | GO Money Rates (GOBankingRates) | `/bank-clone-app` |
| 2 | Healthcare | CareWell (Practo) | `/health-clone-app` |
| 3 | E-commerce | ShopKart (Amazon) | `/shop-clone-app` |
| 4 | Insurance | SafeGuard (GEICO) | `/insurance-clone-app` |
| 5 | Travel | StayNest (Airbnb) | `/travel-clone-app` |
| 6 | Telecom | AirWave (Airtel) | `/telecom-clone-app` |
| 7 | Streaming | StreamFlix (Netflix) | `/stream-clone-app` |
| 8 | Government | USAServices (USAGov / IRS) | `/gov-clone-app` |

### Plus one interactive site

| # | Kind | Brand | Slug |
|---|---|---|---|
| 9 | Interactive / motion-heavy landing page | Auralis (spatial-audio headphones) | `/interactive-website` |

Auralis is not an industry clone and has no API. It exists for the kinds of testing the
eight clones cannot exercise: **scroll-driven animation, canvas rendering, parallax, pinned
sections, reduced-motion behavior, and visual regression** on a page where almost everything
moves. It is a single standalone HTML document (Tailwind + GSAP ScrollTrigger from CDN,
inline canvas code), served verbatim from `public/interactive-website.html`.

What is on the page, and what each part is good for testing:

| Element | Behavior | Useful for |
|---|---|---|
| Hero | Staggered kinetic line reveal on `load` | Entrance-animation timing, first-paint visual regression |
| Floating gallery | 8 cards parallaxing at per-card `data-speed`, scale-in on enter, hover zoom | Scroll-position assertions, hover state, sticky/pinned layout |
| Philosophy statement | GSAP-pinned section, words light up scrubbed to scroll progress | Pin behavior, scrub progress, scroll-locked sections |
| Waveform | Live `<canvas>` that reacts to cursor position | Canvas testing, pointer-move interaction, rAF-driven UI |
| Testimonials | CSS marquee, pauses on hover | Infinite-loop animation, hover-to-pause |
| Pricing + CTA | Reveal-on-scroll cards, three tiers | Reveal assertions, price/content checks |
| Newsletter form | Client-side submit with inline confirmation | Form validation (`type="email"`, `required`), no-network form flow |

The whole page also honors `prefers-reduced-motion` and collapses to a static stacked layout
under 768px, so it doubles as a fixture for accessibility and responsive checks.

---

## 3. All slugs

Prefix everything with `https://my-testing-repo-main.vercel.app` (or `http://localhost:3000` when running locally).

### Pages

```
# Banking
/bank-clone-app
/bank-clone-app/banking
/bank-clone-app/calculators
/bank-clone-app/open-account
/bank-clone-app/article/[slug]

# Healthcare
/health-clone-app
/health-clone-app/video-consult

# E-commerce
/shop-clone-app

# Insurance
/insurance-clone-app
/insurance-clone-app/login
/insurance-clone-app/create-account
/insurance-clone-app/claim
/insurance-clone-app/auto
/insurance-clone-app/quote?product=auto

# Travel  (listing ids: ns1, ns2, ns3, gg1, gg2, gg3, dd1, dd2, dd3, go1, go2, rk1, rk2, rk3)
/travel-clone-app
/travel-clone-app/rooms/rk1
/travel-clone-app/book/rk1
/travel-clone-app/pay/rk1

# Telecom
/telecom-clone-app
/telecom-clone-app/recharge?mobile=9876543210&type=prepaid
/telecom-clone-app/bill-payment
/telecom-clone-app/plans

# Streaming  (title ids: suits, lockupp, friends, office, b99, mentalist, ...)
/stream-clone-app
/stream-clone-app/title/suits
/stream-clone-app/watch/suits
/stream-clone-app/watch/suits?v=<video-url>   # streams ANY video (e.g. a kane-cli recording)

# Government
/gov-clone-app
/gov-clone-app/taxes
/gov-clone-app/report-fraud
/gov-clone-app/report-fraud/form

# Interactive site  (single page, no API; in-page anchors only)
/interactive-website
/interactive-website#features
/interactive-website#specs
/interactive-website#gallery
/interactive-website#pricing
```

### API routes

```
/api/health/health     /api/health/login     /api/health/doctors    /api/health/consult
/api/shop/health       /api/shop/login       /api/shop/products     /api/shop/cart     /api/shop/orders
/api/insurance/health  /api/insurance/login  /api/insurance/quote   /api/insurance/claim
/api/travel/health     /api/travel/login     /api/travel/listings   /api/travel/book
/api/telecom/health    /api/telecom/login    /api/telecom/plans     /api/telecom/recharge
/api/stream/health     /api/stream/login     /api/stream/titles     /api/stream/play
/api/gov/health        /api/gov/login        /api/gov/services      /api/gov/report
```

---

## 4. API design (consistent across every app)

Every industry exposes the same shape, so one test pattern works everywhere:

| Endpoint | Method | Purpose | Success | Failure |
|---|---|---|---|---|
| `…/health` | GET | Liveness / smoke | 200 | - |
| `…/login` | POST | Auth, returns a token | 200 | 401 on bad creds |
| `…/<list>?filter=` | GET | List with optional filter | 200 | - |
| `…/<action>` | POST | Create (booking, order, quote, report, recharge, consult) | 201 | 400 on bad input |

Notes:
- Tokens are demo tokens only (no real secrets, no database). Data is fabricated per request.
- `POST` bodies are JSON. Bad or missing fields return `{ ok: false, error: "..." }` with a 4xx status.

---

## 5. Running kane-cli

### One-time
```bash
kane-cli whoami          # confirm you are logged in
```

### `--agent` or not
- **Running it yourself in a terminal:** leave `--agent` off. You get pretty progress, a live browser, and a readable summary. If kane-cli needs a clarification, it asks you interactively.
- **Feeding output to a script, CI, or another tool that parses it:** add `--agent` to get machine-readable NDJSON.

Everything else (the objective string, `--variables`, `--url`, `--headless`) is identical either way.

### Start URL
Every run needs a page to start from. Each command below opens the **relevant clone app** first (so every video shows that industry's own UI, not the same landing page), and then makes the call. You can swap the start page for any URL you like, or add `--url <page>` instead of naming it in the prompt.

### Just describe what you want (no jargon)
kane-cli is a natural-language agent. Say what to do and what "passing" looks like, in plain English. You do not need special syntax or assertion keywords. "Log in and confirm it returns a token, then use that token to fetch the doctors list" is a complete, valid test.

One thing that is not jargon and does matter: **for an API call, name the method (GET or POST) and include the JSON body.** That is the actual request under test, and it is what lets kane build the call correctly. "Log in with email X" is too vague; "send a POST to /login with JSON body {...}" works. This is plain payload, not templating.

Two optional extras, only if you want them:
- **Precision for CI or saved tests:** to reuse an exact value from one response in a later step deterministically, you can name it (`save the response as login`) and reference it as `{{login.response_body.token}}`. Handy for repeatable pipelines, never required for interactive runs.
- **Masking secrets:** to keep a password out of the logs, pass it as a variable: add `--variables '{"password":{"value":"secret","secret":true}}'` and write `{{password}}` in the prompt.

---

## 6. The 12 use cases

Each use case lists who it targets, the task, the industry it is filmed on, the exact command, the expected result, and a long social caption.

> To run any command in CI or pipe it to a tool, append `--agent`.

---

### 1. Smoke test an endpoint

- **Audience:** Developers, DevOps, SRE
- **Task:** Confirm an API is alive and healthy before every deploy, in one line.
- **Industry:** E-commerce (ShopKart)

**Command**
```bash
kane-cli run "Open the ShopKart store at https://my-testing-repo-main.vercel.app/shop-clone-app, then send a GET request to https://my-testing-repo-main.vercel.app/api/shop/health and confirm the response status is 200 and its status field is 'ok'"
```
**Expected:** 200, body `status: "ok"`.

**Caption**

CI went green. Production started returning 500s. Nobody noticed for three hours, and by then support was on fire.

If that story feels familiar, you already know the problem. A passing build tells you the code compiled. It tells you nothing about whether your API is actually up and answering. Most teams find out from an angry customer, not from a test.

In this video I run a single smoke check against a real e-commerce clone. No script, no collection to maintain, no boilerplate. I describe what "healthy" means in plain English, kane-cli calls the endpoint, and asserts the status is 200 and the service reports "ok". That is the entire test.

Drop this into your pre-deploy step and it becomes the cheapest insurance you will ever write. If the API is down, the pipeline stops before your users ever see a 500.

Try it on the live playground, every clone has a health endpoint you can hit right now.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#DevOps #SRE #APITesting #SmokeTest #kaneCLI #QA #ContinuousDelivery

---

### 2. Auth-token chaining

- **Audience:** QA engineers, API testers
- **Task:** Log in, capture the token, call a protected route, with zero glue code.
- **Industry:** Healthcare (CareWell)

**Command**
```bash
kane-cli run "Open the CareWell site at https://my-testing-repo-main.vercel.app/health-clone-app, then send a POST request to https://my-testing-repo-main.vercel.app/api/health/login with JSON body {\"email\":\"pat@x.com\",\"password\":\"secret\"}, confirm the response status is 200 and the body has a non-empty token, then send a GET request to https://my-testing-repo-main.vercel.app/api/health/doctors with an Authorization header of 'Bearer ' plus that token, and confirm it returns 200"
```
**Expected:** login 200 with a `carewell_` token, doctors call 200.

**Caption**

Be honest: how many times this week did you copy a bearer token from one Postman tab and paste it into another?

Auth chaining is the most common thing in API testing and somehow still the most annoying. Log in, dig the token out of the response, save it to an environment variable, remember to refresh it, then finally make the call you actually cared about. Multiply that across every protected endpoint and it is death by a thousand tabs.

In this video I do the whole thing in one sentence on a real healthcare clone. Log in with credentials, kane-cli captures the token from the response, and passes it straight into the Authorization header of the next call. No environment variables, no extraction scripts, no manual refresh. Secrets stay masked in the logs.

The login flow is the front door of every app in healthcare, banking, and beyond. If your auth chain is painful to test, everything behind it is undertested. This makes it a single readable line.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#QA #APITesting #TestAutomation #Healthtech #kaneCLI #SDET

---

### 3. Create a record via API (seed data)

- **Audience:** SDETs, test-data engineers
- **Task:** Seed a booking through the API instead of clicking the UI dozens of times.
- **Industry:** Travel (StayNest)

**Command**
```bash
kane-cli run "Open the StayNest site at https://my-testing-repo-main.vercel.app/travel-clone-app, then send a POST request to https://my-testing-repo-main.vercel.app/api/travel/book with JSON body {\"listingId\":\"rk1\",\"checkin\":\"2026-08-21\",\"checkout\":\"2026-08-23\",\"guests\":1}, and confirm the response status is 201 and the body status is 'confirmed' with a booking id"
```
**Expected:** 201, `status: "confirmed"`, a `bookingId` stored for reuse.

**Caption**

Every automated UI test starts with a quiet, expensive question: how do I get the app into the right state first?

Too often the answer is "click through the interface forty times to create the data, then start the actual test." It is slow, it is flaky, and it wastes the first two minutes of every run on setup instead of on what you are trying to verify.

In this video I skip all of that. On a real travel booking clone, I seed a full booking with a single API call, assert it came back 201 and confirmed, and store the booking id to reuse downstream. Setup that used to be a UI marathon is now one line that runs in a blink.

This is the unglamorous work that decides whether a suite is fast or frustrating. Seed through the API, then spend your UI time on the behavior that actually matters.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#SDET #TestData #QAEngineering #TravelTech #kaneCLI #Automation

---

### 4. Schema and field validation

- **Audience:** API testers, QA engineers (including non-coders)
- **Task:** Assert the response has the right fields, types, and counts.
- **Industry:** E-commerce (ShopKart)

**Command**
```bash
kane-cli run "Open the ShopKart store at https://my-testing-repo-main.vercel.app/shop-clone-app, then send a GET request to https://my-testing-repo-main.vercel.app/api/shop/products?category=gaming and confirm the response status is 200, the count is 4, and the products include sku_console"
```
**Expected:** 200, `count: 4`, list contains `sku_console`.

**Caption**

The API returned 200. Everyone relaxed. But the price field came back null, and that null quietly shipped to production.

Status codes are the most reassuring lie in testing. A 200 only means the server answered, not that it answered correctly. The bugs that actually reach customers usually hide one level deeper, in a missing field, a wrong type, or a count that is silently off by one.

In this video I validate the real shape of a product listing on an e-commerce clone. I assert the endpoint returns exactly the expected number of items and that a specific product is present, all in language a product manager could read and review. No brittle chains of assertion code, no computer science degree required.

This is the difference between "the API responded" and "the API is correct." One of those is worth testing.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#APITesting #QA #ContractTesting #Ecommerce #kaneCLI #SoftwareTesting

---

### 5. Observe the traffic a UI flow actually fires

- **Audience:** QA engineers, full-stack developers
- **Task:** Verify the real requests your buttons send during a UI flow.
- **Industry:** E-commerce (ShopKart)

**Command**
```bash
kane-cli run "Open the ShopKart store at https://my-testing-repo-main.vercel.app/shop-clone-app, add the first product to the cart, and confirm the add-to-cart request succeeds and no requests on the page failed"
```
**Expected:** cart request 201, no 5xx during the flow.

**Caption**

Postman can test your API perfectly. It still cannot tell you whether your "Add to Cart" button actually calls it.

That gap is where the nastiest bugs live. The backend is green. The hand-built request works. But the front end fires the wrong endpoint, sends the wrong payload, or silently swallows a failure, and no API-only test will ever catch it because no API-only test is watching the real UI.

In this video I click Add to Cart on a real store and watch the actual network traffic that click produces. kane-cli asserts the cart request came back 201 and that nothing in the whole flow returned a 5xx. This is the true integration between front end and back end, verified on the requests your users really trigger, not on a request I typed by hand.

If you only test the API in isolation, you are testing half the system. This is the other half.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#QA #E2ETesting #FrontendTesting #Ecommerce #kaneCLI #FullStack

---

### 6. Negative and error paths

- **Audience:** QA engineers, security-minded testers
- **Task:** Confirm bad credentials are rejected with a proper 401.
- **Industry:** Insurance (SafeGuard)

**Command**
```bash
kane-cli run "Open the SafeGuard login page at https://my-testing-repo-main.vercel.app/insurance-clone-app/login, then send a POST request to https://my-testing-repo-main.vercel.app/api/insurance/login with JSON body {\"email\":\"bad\",\"password\":\"1\"} and confirm it is rejected with response status 401 and an 'invalid credentials' error"
```
**Expected:** 401, error contains "invalid".

**Caption**

Everyone tests the happy path. The bugs, and the breaches, live in the sad ones.

It is easy to prove that a correct password logs you in. The harder and far more important question is what happens when the password is wrong, the field is empty, or the input is garbage. Does the app reject it cleanly with a 401, or does it leak, crash, or worse, let the request through?

In this video I test the front door of an insurance clone with deliberately bad credentials. kane-cli asserts the response is 401 and that the error message actually says the credentials are invalid. Positive and negative cases sit side by side in plain readable language, with no per-case scripting to maintain.

In insurance, banking, and any regulated space, the negative path is not an edge case. It is the security boundary. Test it like one.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#QA #SecurityTesting #NegativeTesting #Insurtech #kaneCLI #APITesting

---

### 7. Response-time and SLA gates

- **Audience:** Performance engineers, SRE
- **Task:** Fail the test if the endpoint is too slow.
- **Industry:** Telecom (AirWave)

**Command**
```bash
kane-cli run "Open the AirWave plans page at https://my-testing-repo-main.vercel.app/telecom-clone-app/plans, then send a GET request to https://my-testing-repo-main.vercel.app/api/telecom/plans and confirm the response status is 200 and it completed in under 1500 milliseconds"
```
**Expected:** 200 and all responses under the threshold.

**Caption**

Four hundred milliseconds slower and users start to leave. So here is the uncomfortable question: are you asserting on latency, or just quietly hoping it stays fast?

Most functional suites check that a response is correct and never check that it was quick. Then performance degrades one deploy at a time, nobody notices until it is a crisis, and the postmortem always says the same thing: we had no test watching for this.

In this video I add a latency gate to a telecom plans endpoint. Alongside the usual status assertion, kane-cli fails the run if the response did not complete inside my threshold. It is a first-class part of the test, not a separate performance project, and it runs for free in your own pipeline.

In telecom and streaming, speed is the product. Put a number on it and let your tests defend it.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#Performance #SRE #APITesting #Telecom #kaneCLI #Observability

---

### 8. Migrate an existing curl

- **Audience:** Developers, API testers with existing runbooks
- **Task:** Turn a curl you already have into a real test instantly.
- **Industry:** Telecom (AirWave)

**Command**
```bash
kane-cli run "Open the AirWave recharge page at https://my-testing-repo-main.vercel.app/telecom-clone-app/recharge, then run this recharge request and confirm it succeeds: curl -X POST https://my-testing-repo-main.vercel.app/api/telecom/recharge -H 'Content-Type: application/json' -d '{\"mobile\":\"9876543210\",\"amount\":299,\"type\":\"prepaid\"}'"
```
**Expected:** 201, `status: "success"`.

**Caption**

Open your team runbook. Count the curl commands. That is not documentation, that is a hundred tests you have not written yet.

Every team already has curls scattered across READMEs, tickets, and shell history. The knowledge is right there. The problem is that turning each one into a maintained test usually means importing it somewhere, re-adding the assertions by hand, and babysitting a collection.

In this video I take a plain curl for a telecom recharge, paste it in verbatim, method, headers, body and all, and add a single assertion. That is the whole migration. kane-cli keeps the request exactly as written and checks that it came back 201 with a success status.

Your existing curls are your test suite in waiting. This is the fastest path from "we have a command for that" to "we have a test for that."

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#APITesting #DeveloperTools #curl #Telecom #kaneCLI #DevEx

---

### 9. Generate a test suite from a description

- **Audience:** QA leads, test managers
- **Task:** Let AI draft happy, negative, and edge cases from a single sentence.
- **Industry:** Travel (StayNest)

**Command**
```bash
kane-cli generate "Test the StayNest travel booking API at https://my-testing-repo-main.vercel.app/api/travel: list listings, create a booking, and auth failures"
```
**Expected:** Scenarios and cases (positive / negative / edge). Note the request id it prints for the next step.

**Caption**

Staring at a blank test plan, trying to remember every edge case for the tenth feature this sprint. We have all been there, and it does not scale.

Enumerating coverage by hand is slow, and it is exactly the kind of work that quietly gets skipped when the deadline is close. The negative cases and the weird edges are the first to fall off the list, which is precisely where the bugs were hiding.

In this video I describe a travel booking API in one sentence and let kane-cli draft the suite: list, create, and the auth failures, organized into positive, negative, and edge scenarios. Then I refine what matters instead of typing every case from scratch. Coverage goes from a blank page to a reviewable draft in minutes.

The tool is not replacing your judgment. It is removing the blank-page tax so your judgment goes where it counts.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#QALeadership #TestAutomation #AITesting #TravelTech #kaneCLI #TestStrategy

---

### 10. Save it and re-run as regression

- **Audience:** SDETs, platform and CI owners
- **Task:** Version-controlled, reviewable, re-runnable regression tests.
- **Industry:** Travel (StayNest)

**Command**
```bash
kane-cli generate --save --req <REQUEST_ID_FROM_STEP_9>     # writes a _test.md file
kane-cli testmd run <path/to/the_test.md>                   # runs it
```
**Expected:** A saved plain-English `_test.md`, then a pass/fail run you can commit and repeat.

**Caption**

Ask your team to code-review a change to the test suite. Now watch their faces when the diff is a thousand lines of exported JSON that no human can read.

Tests that live as opaque blobs are tests nobody reviews, nobody trusts, and everybody quietly works around. The whole point of a regression suite is confidence, and you cannot have confidence in something you cannot read.

In this video I save an AI-drafted suite as a plain-English test file, commit it, and re-run it deterministically. The diffs are readable. The review is real. Authoring costs a little the first time, then replay is fast and cheap because the cost scales with how often a test changes, not how often it runs.

In travel, banking, and anything with a compliance trail, auditable and reviewable tests are not a nice-to-have. This is how you get them.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#SDET #CICD #RegressionTesting #TestAutomation #kaneCLI #QAEngineering

---

### 11. End-to-end, UI and API in one test

- **Audience:** QA engineers, full-stack developers
- **Task:** One test that clicks through the UI and asserts on the API in the same run.
- **Industry:** Travel (StayNest)

**Command**
```bash
kane-cli run "On the StayNest site at https://my-testing-repo-main.vercel.app/travel-clone-app, book the first Rishikesh room end to end: open it, click Reserve, continue to payment, pay with UPI, and confirm the booking is confirmed and nothing on the page errored"
```
**Expected:** Booking confirmed on screen, book request 201, no 5xx.

**Caption**

Most teams split their testing brain in two. One tool clicks through the UI. Another pokes the API. And the seam between them, the exact place real users live, goes untested.

That seam is where integration bugs breed. The UI looks fine, the API looks fine, and the handoff between them quietly breaks.

In this video I run the entire travel booking flow as a single test. Open a room, click Reserve, continue to payment, choose a method, and confirm the booking, then in the same breath assert that the booking request came back 201 and that not a single call in the flow returned a 5xx. UI actions and API assertions, together, in one readable script.

This is the thing a request builder structurally cannot do and a UI-only tool will not see. One test, the whole journey, both layers at once.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#E2ETesting #QA #FullStackTesting #TravelTech #kaneCLI #Automation

---

### 12. Robustness of a critical form

- **Audience:** QA engineers, testers in regulated and government sectors
- **Task:** Verify a high-stakes form submits cleanly with no console or API errors.
- **Industry:** Government (USAServices)

**Command**
```bash
kane-cli run "On the government report-fraud form at https://my-testing-repo-main.vercel.app/gov-clone-app/report-fraud/form, report identity theft with a short description, submit it, and confirm the report goes through with no errors on the page"
```
**Expected:** Report submitted on screen, report request 201, zero console errors.

**Caption**

In government tech, a broken form is not a minor inconvenience. It is a citizen who could not report fraud, claim a benefit, or get the help they came for.

The stakes make it worse that these flows are so easy to under-test. A form can look perfect, submit, and still throw a silent console error or fire a request that quietly fails, and the person on the other end just sees "something went wrong."

In this video I run a report-fraud form on a government services clone from start to finish. Select a category, fill in the details, submit, and then assert the confirmation appears, the submission came back 201, and there are zero console errors along the way. Correct on the surface and correct underneath.

For public services, healthcare, and anything people depend on, "it looked like it worked" is not good enough. Prove it did.

Live: https://my-testing-repo-main.vercel.app/ | Code: https://github.com/bhawana001/my-testing-repo-main

#QA #GovTech #FormTesting #Accessibility #kaneCLI #SoftwareTesting

---

## 7. Quick reference: audience by industry

| Industry | Clone | Best flow to film | Primary audience |
|---|---|---|---|
| Banking | GO Money Rates | open-account form, calculators | QA, fintech testers |
| Healthcare | CareWell | consult booking (symptom + phone) | QA, healthtech testers |
| E-commerce | ShopKart | add to cart, checkout | QA, full-stack devs |
| Insurance | SafeGuard | get a quote, file a claim, login 401 | QA, API testers |
| Travel | StayNest | search, reserve, pay, confirm | SDET, E2E testers |
| Telecom | AirWave | recharge, bill payment | Developers, performance engineers |
| Streaming | StreamFlix | play a title (any video via ?v=) | QA, media testers |
| Government | USAServices | report-fraud form | QA, regulated-sector testers |
| Interactive site | Auralis | scroll reveals, parallax gallery, live canvas | UI/visual, motion & accessibility testers |

### UI starting points on Auralis (`/interactive-website`)

Auralis has no API, so these are UI runs. In plain English for kane-cli:

```bash
# Scroll-driven reveal
kane-cli run "Open https://my-testing-repo-main.vercel.app/interactive-website, scroll down to the section headed \"One instrument. Two voices.\" and confirm both feature cards are visible with the headings \"The voice of the room.\" and \"The geometry of sound.\""

# Canvas interaction
kane-cli run "Open https://my-testing-repo-main.vercel.app/interactive-website, scroll to the \"A spectrum you can feel.\" section, move the cursor across the live impulse response visualization, and confirm the waveform reacts to the cursor position"

# Client-side form
kane-cli run "Open https://my-testing-repo-main.vercel.app/interactive-website, scroll to the footer, enter \"qa@auralis.test\" in The Field Notes email field, click Subscribe, and confirm a confirmation message naming that email appears"
```

Unlike the twelve API commands in section 6, these three have not been run end to end against
the live deployment yet — treat them as starting points, not verified runs.

**Reusable hook formula for any new video:** "[Painful thing the audience does today]. Watch me do it in one sentence with kane-cli, on a real [industry] app."

---

*Tip: append `--agent` to any `kane-cli` command when you want machine-readable NDJSON output (for CI or scripts). Leave it off when running interactively in your terminal.*
