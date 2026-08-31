---
test: ../head-of-household-applies-the-21-900-standard-deduction-live_test.md
status: failed
started: 2026-08-27T14:15:05.252Z
duration_s: 107
session_id: 7151c876-2d8a-47f5-9c24-484eab97f1d9
---

# Head of household applies the $21,900 standard deduction live — Result

## Step 1 ✓ passed (23.3s)
md5: 22b83e6b14849ea034de5af4bb189884
Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2 ✓ passed (40.3s)
md5: 53750629b5ae0d06c0c382094079381f
On the calculator page, enter annual income 85000, select filing status Head of household, keep the standard deduction selected, and wait for the estimate panel to update while staying on the calculator page.

## Step 3 ✗ failed (20.6s)
md5: 5a6bf7e9bf329d8aa6c75ebbe681c4b7
Reason: Screenshot failed: TargetClosedError: screenshot: Target page, context or browser has been closed — bug verdict: Estimate panel renders NaN for income totals [application_issue/ui_data_defect, confidence 0.95]
Assert the estimate panel lists Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld in that order, and that Gross income shows $85,000 while the Deductions row shows $21,900.

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 — assert ⏭ skipped
