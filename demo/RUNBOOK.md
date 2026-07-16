# Kane CLI vs Playwright MCP — Demo Runbook

System-under-test: **bank-clone-app** (`/bank-clone-app`), which you fully
control. Both tools run the **same objective** against the **same app** —
the tool is the only variable.

Split screen: **LEFT = Playwright MCP + Claude Code · RIGHT = Kane CLI + Claude Code.**

---

## Off-screen prerequisites (NOT filmed)

```bash
# 1. Run the app
npm run dev                         # http://localhost:3000/bank-clone-app

# 2. Playwright side
npm i -D @playwright/test && npx playwright install chromium

# 3. Kane side — verify the test authors/runs clean
#    (finalize demo/kane/open-account_test.md with `kane-cli generate`)

# 4. Baseline: all breaks OFF
node demo/demo-toggle.mjs reset
```

Between every act, flip the failure mode **off camera** with the toggle
script (Next.js hot-reloads — no manual restart):

| Act | Command | What changes |
|-----|---------|--------------|
| 1 Auto-Heal | `node demo/demo-toggle.mjs autoheal` | CTAs renamed: "Open Account"→"Get Started", "Continue →"→"Next step →", "Open account"→"Submit application" |
| 2 Bug | `node demo/demo-toggle.mjs bug` | Calculator gross income becomes `$NaN` |
| 3 Visual | `node demo/demo-toggle.mjs visual` | Primary CTAs + hero headline render invisible (DOM intact) |
| reset | `node demo/demo-toggle.mjs reset` | back to green baseline |
| check | `node demo/demo-toggle.mjs status` | show active flag |

---

## Act 0 — Cold open (~15s)
Show the comparison table, circle **Bug Diagnosis, Auto-Heal, Visual Validation.**
> "Both get a browser and Claude Code. Watch what happens when the app fights back."

---

## 🎬 Act 1 — Auto-Heal

**Baseline (both green).** Same objective on both panes:
> *"Open a high-yield savings account with test data and confirm it submits."*

- LEFT: `npx playwright test demo/playwright/open-account.spec.js --headed` → passes
- RIGHT: run the Kane objective / `open-account_test.md` → passes

**Off-screen:** `node demo/demo-toggle.mjs autoheal`

**Re-run the exact same commands:**

| LEFT — Playwright MCP | RIGHT — Kane CLI |
|---|---|
| `getByRole("button", {name: "Continue →"})` → **selector not found, red, stale script** | Re-derives from intent, **clicks "Next step →", completes green** |

**💰 Money shot:** left frozen on the selector error while the right browser
keeps clicking through and finishes.
> "Playwright's selector is now a liability. Kane never hard-coded it."

---

## 🎬 Act 2 — Bug Diagnosis

**Off-screen:** `node demo/demo-toggle.mjs reset && node demo/demo-toggle.mjs bug`

Same objective on both: *"Check the tax calculator computes gross income for a $60,000 income."*

- LEFT: `npx playwright test demo/playwright/calculator.spec.js --headed`

| LEFT — Playwright MCP | RIGHT — Kane CLI |
|---|---|
| `Error: expected "$60,000", received "$NaN"` — a symptom, no cause | Surfaces the bug **+ probable cause + triage**: gross income is NaN because the value is prefixed with "$" before `Number()` conversion |

**💰 Money shot:** zoom both failure outputs. One is a bare assertion diff;
one is a triage report a QA engineer can act on.

---

## 🎬 Act 3 — Why the Visual Validation layer matters *(strongest close)*

**Off-screen:** `node demo/demo-toggle.mjs reset && node demo/demo-toggle.mjs visual`

The DOM is identical — every selector resolves, every click works — but the
primary CTAs and hero headline are invisible.

Re-run the **same open-account objective** on both:

| LEFT — Playwright MCP | RIGHT — Kane CLI |
|---|---|
| **PASSES GREEN ✅** — only sees the DOM. Ships a broken page. | Visual layer **flags the regression ❌** — CTA not visible to a user |

**💰 Money shot:** Playwright's green check next to the actual invisible-CTA
page.
> "Playwright says ship it. Your users see this."

---

## ⚡ Act 4 — Rapid-fire convincers (pick 2–3, ~20s each)

- **Human-in-the-loop (Ask tool):** Kane pauses mid-flow for an OTP/2FA, then
  resumes. Playwright just blocks.
- **Run evidence:** Kane auto-captures screenshots + JSON step artifacts + run
  log to TestMu Test Manager — show the dashboard. Playwright: nothing
  persistent without 3rd-party glue.
- **The test artifact:** show Kane's plain-Markdown `open-account_test.md`
  (readable intent) vs Playwright's brittle selector code in
  `demo/playwright/open-account.spec.js`.

---

## Close — Scorecard (~15s)
Return to the table, stamp ✅/❌ down the three proven rows, end on the
Act-3 visual-validation frame.

**Reset when done:** `node demo/demo-toggle.mjs reset`
