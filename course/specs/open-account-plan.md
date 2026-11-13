# Open Account — Savings Account Products Test Plan

## Scope

- Feature: **Feature A — Savings account products** (`PRD-bank-savings.md` section 4)
- Acceptance criteria: **AC-A1, AC-A2, AC-A3, AC-A4** (Feature B/C criteria are out of scope, except where the "Fund it" step is used to observe the Money Market minimum)
- Base URL: `http://localhost:3000/bank-clone-app/open-account`

## Assumptions / starting state

- Every scenario starts from a fresh page load of the base URL (new browser context, no cookies/storage). No state is carried between scenarios; they can run in any order.
- The page opens on step 1 "Account type" with heading "Choose your account".
- Observed accessible structure (live snapshot): the three product cards are `div role="button" tabindex="0"` elements, each with an accessible name made of the full card text, e.g.
  - `button "4.34% High-Yield Savings No monthly fees, no minimums. Our most popular account. Min: $0"`
  - `button "3.10% Everyday Savings Simple savings with easy transfers and automatic goals. Min: $0"`
  - `button "4.00% Money Market Higher tiers for larger balances, with check-writing access. Min: $100.00"`
  Each also contains a `heading level=4` with the product name. Locators should use these roles/names (e.g. `getByRole('button', { name: /High-Yield Savings/ })`), not CSS classes.
- "Selected" is currently exposed only through the CSS class `is-selected`; there is no `aria-pressed`, `aria-checked`, `aria-selected`, or radio semantics (see S-N7).
- Test data for the Fund-it step: First name Ada, Last name Lovelace, email ada@example.com, DOB 1990-01-01, phone 5555555555, SSN last 4 1234, address 1 Main St, city LA, state CA, ZIP 90210.

## Positive scenarios

### P1. Three savings products are listed
- **Traceability:** AC-A1
- **Starting state:** fresh load
- **Steps:**
  1. Navigate to `/bank-clone-app/open-account`.
  2. Inspect the "Choose your account" panel.
- **Expected:** Three product cards are shown with headings "High-Yield Savings", "Everyday Savings", "Money Market", in that order. The stepper shows step 1 "Account type" as current.
- **Success:** all three names visible. **Failure:** any missing, renamed, or reordered.

### P2. High-Yield Savings advertises 4.34% APY
- **Traceability:** AC-A2
- **Starting state:** fresh load
- **Steps:** 1. Navigate to the page. 2. Read the High-Yield Savings card.
- **Expected:** The card shows the text `4.34%`. (Other cards show 3.10% Everyday, 4.00% Money Market, per PRD table.)
- **Success:** `4.34%` in the HYSA card. **Failure:** any other value or the value missing.

### P3. Minimum opening deposits are displayed
- **Traceability:** AC-A3
- **Starting state:** fresh load
- **Steps:** 1. Navigate to the page. 2. Read the "Min:" line on each card.
- **Expected:** High-Yield Savings `Min: $0`; Everyday Savings `Min: $0`; Money Market `Min: $100.00`.
- **Success:** exact texts match. **Failure:** Money Market shows `$100` or any other format, or either savings card shows non-zero.

### P4. High-Yield Savings is selected on load
- **Traceability:** AC-A4
- **Starting state:** fresh load, no clicks
- **Steps:** 1. Navigate to the page. 2. Without interacting, check which card is selected (class `is-selected`; see S-N7 for the accessibility caveat).- **Expected:** Only the High-Yield Savings card is selected; the other two are not.
- **Success:** exactly one selected card and it is HYSA. **Failure:** none, several, or a different card selected.

### P5. Selecting another product moves the highlight
- **Traceability:** AC-A4 (selection behaviour per PRD "Selecting a different product highlights it")
- **Starting state:** fresh load (HYSA selected)
- **Steps:**
  1. Click the Everyday Savings card.
  2. Verify selection state of all three cards.
  3. Click the Money Market card.
  4. Verify selection state again.
  5. Click High-Yield Savings.
- **Expected:** After each click only the clicked card is highlighted; the previously selected card loses its highlight. No more than one highlighted card at any time.
- **Success/Failure:** single-selection invariant holds after each click / any step leaves two or zero highlighted cards.

### P6. Keyboard selection with Tab + Enter
- **Traceability:** AC-A4
- **Starting state:** fresh load
- **Steps:**
  1. Press Tab until focus lands on the Money Market card (cards are in the tab order; header links come first).
  2. Press Enter.
- **Expected:** Money Market becomes the only selected card; focus stays on it.
- **Success:** selection moves via keyboard. **Failure:** card not focusable or Enter does nothing.

### P7. Selection persists across Continue and Back
- **Traceability:** AC-A4
- **Starting state:** fresh load
- **Steps:**
  1. Click Money Market.
  2. Click "Continue →" (lands on "About you").
  3. Click "← Back".
- **Expected:** Step 1 is shown again with Money Market still the only selected card (not reset to HYSA).
- **Success:** Money Market still selected. **Failure:** selection resets to the default.

### P8. Selected product is carried to the Fund-it step
- **Traceability:** AC-A2, AC-A4
- **Starting state:** fresh load
- **Steps:** 1. Leave HYSA selected. 2. Continue, fill About-you with the test data, Continue.
- **Expected:** "Fund your account" subtext reads "Make your opening deposit for the High-Yield Savings account (4.34% APY)."
- **Success:** name and APY match. **Failure:** another product or rate.

## Negative / edge scenarios

### N1. Money Market with a $50 deposit is blocked
- **Traceability:** AC-A3
- **Starting state:** fresh load
- **Steps:** 1. Select Money Market. 2. Continue. 3. Fill About-you with test data; Continue. 4. Enter `50` in "Opening deposit (USD)". 5. Click "Continue →".
- **Expected:** Stays on "Fund your account"; error `Minimum opening deposit is $100.00` is shown under the deposit field.
- **Success:** blocked with that message. **Failure:** advances to Review or the message differs.

### N2. Money Market boundary: $99.99 rejected, $100 accepted
- **Traceability:** AC-A3
- **Starting state:** as N1 up to the Fund-it step
- **Steps:** 1. Enter `99.99`, Continue. 2. Replace with `100`, Continue.
- **Expected:** `99.99` shows `Minimum opening deposit is $100.00` and stays; `100` advances to "Review & open" with no error.
- **Success/Failure:** boundary behaves exactly as above.

### N3. High-Yield Savings accepts a $0 deposit
- **Traceability:** AC-A3, AC-A4
- **Starting state:** fresh load (HYSA default)
- **Steps:** 1. Continue; fill About-you; Continue. 2. Enter `0` in the deposit field. 3. Click "Continue →".
- **Expected:** No error; advances to "Review & open".
- **Success:** advances. **Failure:** blocked or an error is shown.

### N4. Everyday Savings accepts a $0 deposit
- **Traceability:** AC-A3
- **Starting state:** fresh load
- **Steps:** Select Everyday Savings; Continue; fill About-you; Continue; enter `0`; Continue.
- **Expected:** Advances to "Review & open" with no error.

### N5. Empty or negative deposit is rejected for a $0-minimum product
- **Traceability:** AC-A3 (boundary of "minimum $0")
- **Starting state:** fresh load (HYSA)
- **Steps:** At Fund-it, enter `-1` and Continue; then clear the field and Continue.
- **Expected:** Per the app, `-1` is rejected with `Enter an amount of $0 or more`; empty field is treated as 0 (see Open question 2) — confirm against product owner before asserting the empty case.
- **Success:** `-1` blocked. **Failure:** negative deposit accepted.

### N6. Exactly three products, no extras or duplicates
- **Traceability:** AC-A1
- **Starting state:** fresh load
- **Steps:** 1. Count the product cards in "Choose your account" (role button with APY heading). 2. Click each card in turn and recount.
- **Expected:** Exactly 3 cards, each with a unique name; the count never changes after selection.
- **Success/Failure:** count is 3 and names unique / any extra or duplicate card.

### N7. Accessibility gap: selected state not exposed to assistive tech
- **Traceability:** AC-A4 (PRD says selection is "highlighted"; assistive tech must be able to perceive it)
- **Starting state:** fresh load
- **Steps:** 1. Take an accessibility snapshot. 2. Inspect the HYSA card and the others for `aria-pressed`, `aria-checked`, `aria-selected`, or a radio/radiogroup role. 3. Select another card and compare snapshots.
- **Expected (desired):** selected card is distinguishable in the accessibility tree, e.g. `aria-pressed="true"` or radio `checked`.
- **Observed:** all three cards are plain `button`s with identical-form names; the snapshot is identical before and after selection. **This scenario is expected to FAIL today** and should be filed as an accessibility defect. Because of this, selection tests (P4-P7) must assert via the `is-selected` class until fixed.

### N8. Space key does not select a card
- **Traceability:** AC-A4 (keyboard operability)
- **Starting state:** fresh load
- **Steps:** 1. Tab to the Everyday Savings card. 2. Press Space.
- **Expected (desired, as with any `role="button"`):** Everyday Savings becomes selected.
- **Observed:** no change; HYSA stays selected. Only Enter works (`onKeyDown` checks `e.key === "Enter"` only). **Expected to FAIL today**; log as a keyboard-accessibility defect (the PRD does not explicitly require Space, so confirm).

## Discrepancies / open questions

1. **No PRD-vs-app text discrepancy found for AC-A1–A4.** Observed: names, APYs 4.34% / 3.10% / 4.00%, `Min: $0`, `Min: $0`, `Min: $100.00` and HYSA selected on load all match the PRD. (Note the PRD table writes "$100"; AC-A3 says "$100.00" and the app shows "$100.00".)
2. **Empty deposit:** the code treats an empty deposit as 0 (`Number("") >= 0`), so a blank field passes for HYSA/Everyday; for Money Market, blank is rejected with the $100.00 message. PRD is silent. Confirm intended.
3. **Selection state not exposed to assistive tech** (N7): cards are `role="button"` with no pressed/checked state (page.js, `.b-option` div with `role="button" tabIndex={0}`). Suggest `role="radio"` in a `radiogroup` or `aria-pressed`.
4. **Space key not supported** (N8): `onKeyDown={(e) => e.key === "Enter" && setAccountType(a.id)}`. Native buttons activate on Space; PRD silent.
5. Accessible name of each card is the whole card text (APY first), which makes names long and rate-first; consider a labelled heading association. Not a PRD issue.
6. Console shows only a `favicon.ico` 404 (unrelated to Feature A).
7. Money Market minimum is enforced at the Fund-it step, not at selection; PRD AC-A3 only requires it be *stated*, so enforcement scenarios (N1, N2) trace to the PRD sentence on minimums but not to a numbered AC. Confirm whether a Feature C criterion covers it.

## AC coverage

| AC | Description | Scenarios |
|---|---|---|
| AC-A1 | All three products listed | P1, N6 |
| AC-A2 | HYSA APY 4.34% | P2, P8 |
| AC-A3 | Minimums $100.00 / $0 / $0 | P3, N1, N2, N3, N4, N5 |
| AC-A4 | HYSA selected by default (and selection behaviour) | P4, P5, P6, P7, P8, N3, N7, N8 |
