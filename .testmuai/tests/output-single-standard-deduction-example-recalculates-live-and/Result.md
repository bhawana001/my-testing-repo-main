---
test: ../single-standard-deduction-example-recalculates-live-and_test.md
status: failed
started: 2026-08-27T14:02:16.150Z
duration_s: 236
session_id: b39931e0-fa08-46f5-a599-6ee9d0d7a642
---

# Single standard deduction example recalculates live and shows the ordered estimate breakdown — Result

## Step 1 ✓ passed (30.2s)
md5: 22b83e6b14849ea034de5af4bb189884
Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2 ✗ failed (201s)
md5: 3ae7d2987719358de707e086f847788f
Reason: AP determined agent is stuck — no viable actions remain — bug verdict: Estimate panel shows $NaN after annual income entry [application_issue/ui_data_defect, confidence 0.93]
On the calculator page, enter annual income 85000, keep filing status set to Single, keep the standard deduction selected, and wait for the estimate panel to update while staying on the calculator page.

## Step 3 ⏭ skipped

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 — assert ⏭ skipped
