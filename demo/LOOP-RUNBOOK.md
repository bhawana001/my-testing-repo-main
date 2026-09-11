# Loop Engineering Runbook — checkout, verified in a real browser

The system under test is **ShopKart** (`/shop-clone-app`), which you fully control.
The loop is: **Claude Code builds → kane-cli verifies in a real browser → the
failure feeds the fix → repeat until green.**

The finish line is verifiable by a computer: *a real browser sees the words
"Payment successful."* Not "the code looks done."

---

## What exists in the app

| Piece | Where |
|---|---|
| Cart → "Proceed to Checkout" | `app/shop-clone-app/page.js` |
| Checkout page (card, Pay button, confirmation) | `app/shop-clone-app/checkout/page.js` |
| Payment API — the "Stripe" side | `app/api/shop/pay/route.js` |
| Order API | `app/api/shop/orders/route.js` |

Test cards: **4242 4242 4242 4242** succeeds (201) · **4000 0000 0000 0002** is
declined (402) · anything shorter than 15 digits is rejected (400).

**The planted bug** — the one the loop has to find and fix — is real, not a flag:
the checkout writes the payment receipt to a `useRef` instead of state, so React
never re-renders. The charge succeeds (a 201 is right there in the network tab)
and the page sits on "Processing…" forever. No unit test catches it. Only a
browser does.

---

## Off-screen prerequisites (NOT filmed)

```bash
npm run dev                          # http://localhost:3000/shop-clone-app
kane-cli whoami                      # confirm you are logged in
node demo/demo-toggle.mjs reset      # clear the older demo's flags
node demo/demo-toggle.mjs paybug     # arm the checkout bug
node demo/demo-toggle.mjs status     # -> Checkout: BROKEN
```

---

## Beat 1 — "I put Kane CLI in the loop as the checker, with one plain-English goal"

Show the objective on screen. It is one paragraph of English —
`demo/loop/objective.txt`:

```bash
kane-cli run "$(cat demo/loop/objective.txt)" \
  --agent --max-steps 35 \
  --variables '{"base_url":{"value":"http://localhost:3000"}}'
```

> Go to {{base_url}}/shop-clone-app, click the first "Add to Cart" button on the
> page, then click the Cart icon in the header to open the cart drawer and click
> "Proceed to Checkout". On the checkout page, type 4242 4242 4242 4242 into the
> "Card number" field, type 12 / 34 into the "Expiration" field, and type 123
> into the "CVC" field. Click the Pay button, and in that same step confirm the
> POST request to /api/shop/pay returned HTTP status 201. Then confirm the page
> shows the text "Payment successful", and store the charge ID starting with
> "ch_" as "charge_id". The confirmation screen is the end of the test — stop the
> run there. If the page is showing "Processing…" instead of the confirmation,
> the checkout is stuck: report that as the failure.

Three things make this a loop goal rather than a wish:

- **It ends in a yes/no a computer can answer** — the words "Payment successful"
  are on the screen, or they are not.
- **It checks the money moved, not just the pixels** — `POST /api/shop/pay`
  returned 201, asserted in the same step as the click.
- **It names the failure mode out loud** — a page stuck on "Processing…" is a
  fail, so the agent cannot call a hung screen "done".
- **It says where to stop** — the confirmation ends the test. Without that the
  agent keeps hunting after every assertion has already passed, and a green run
  times out as "stuck". Both clauses are load-bearing; this exact wording is
  verified against the broken build (fails in ~3 min) and the fixed build
  (passes in ~3.5 min).

## Beat 2 — the red run (this is the money shot)

Kane CLI opens a real browser and tries to pay like a customer. It hands back a
pass/fail list:

| Check | Result |
|---|---|
| Card fields accept the test card | ✅ |
| `POST /api/shop/pay` → 201 | ✅ **the charge went through** |
| Page shows "Payment successful" | 🔴 **still on "Processing…"** |

Kane's own triage on that run, verbatim — this is what gets piped to Claude:

> The payment flow appears to hang after submission, leaving the page stuck
> showing that it is still processing instead of finishing the order.
> Investigate the checkout code that runs after the payment request completes
> and make sure a successful payment always switches the page from the loading
> state to the confirmation view and exposes the charge ID.

That split — payment succeeded, UI never updated — is the whole point. Zoom the
network assertion next to the frozen button.

## Beat 3 — the failure feeds the fix, and the loop re-runs itself

```bash
./demo/loop/loop.sh
```

That is the loop in one file: run the objective → if it fails, pipe the run
straight into `claude -p` with `demo/loop/fix-prompt.md` → re-run the *same*
objective → stop when green (max 3 attempts).

Claude's fix is the honest one: move the receipt from a ref into state and set
the status to `success`, so the component re-renders onto the confirmation.

## Beat 4 — green, and it stops on its own

```text
✅ GREEN on attempt 2 — the browser saw "Payment successful". Loop stops.
```

The passing run's final state carries the *real* charge ID the API returned
(`charge_id: ch_bep92q7obh`, `payment_request_status: 201`) — not a string the
page invented.

---

## The guardrail — "tell it what cheating looks like"

A loop chasing green will fake the payment to escape. Two things stop it here.

**1. The fix prompt forbids it in writing** (`demo/loop/fix-prompt.md`): don't
edit the objective, don't mock `/api/shop/pay`, don't hardcode a charge ID or a
success screen, don't weaken the decline path.

**2. A second objective proves it didn't** — the decline card must still be
refused. A mocked-out payment passes this only by accident, and a hardcoded
success screen fails it instantly:

```bash
kane-cli run "$(cat demo/loop/objective-guardrail.txt)" \
  --agent --max-steps 20 \
  --variables '{"base_url":{"value":"http://localhost:3000"}}'
```

> Go to {{base_url}}/shop-clone-app/checkout, type 4000 0000 0000 0002 into the
> "Card number" field, type 12 / 34 into the "Expiration" field, and type 123
> into the "CVC" field. Click the Pay button, and in that same step confirm the
> POST request to /api/shop/pay returned HTTP status 402. Then confirm the page
> shows the message "Your card was declined" and does NOT show the text
> "Payment successful".

Run this one right after the loop goes green. Two greens — one that the happy
path works, one that the sad path was not paved over — is what "verified" means.

---

## Saving the objective as a re-runnable test

```bash
kane-cli generate "<paste the objective>" --agent      # author it
kane-cli generate --save --req <REQUEST_ID> --agent    # -> .testmuai/tests/*_test.md
kane-cli testmd run .testmuai/tests/<file>_test.md     # re-run it
```

That `_test.md` is what you hand to CI / HyperExecute for the cross-browser and
scheduled runs.

---

## Reset between takes

```bash
node demo/demo-toggle.mjs paybug     # back to the failing checkout
node demo/demo-toggle.mjs payfix     # jump straight to green (no agent needed)
node demo/demo-toggle.mjs status     # which state am I in?
```

`paybug`/`payfix` copy `demo/checkout-variants/checkout.{broken,fixed}.js` over
`app/shop-clone-app/checkout/page.js`. Full revert of everything:
`git checkout app/ demo/ REAL-EVALS.md`.
