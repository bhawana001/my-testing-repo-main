---
test: ../taxable-income-stays-at-zero-for-single-incomes-at-and-below_test.md
status: failed
started: 2026-08-27T14:06:34.406Z
duration_s: 172
session_id: 53520aba-6697-4f81-a080-d35d9c77de81
---

# Taxable income stays at zero for Single incomes at and below the deduction boundary — Result

## Step 1 ✓ passed (67.6s)
md5: 22b83e6b14849ea034de5af4bb189884
Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2 ✓ passed (64.5s)
md5: 36fc4902f77d8fcb9fae274e0a49f851
On the calculator page, keep filing status set to Single with the standard deduction selected, enter annual income 0, and wait for the estimate panel to update on the same page.

## Step 3 ✗ failed (35.9s)
md5: 5956952db00b2b0e5d17e6bb89fcb020
Reason: AP determined agent is stuck — no viable actions remain — bug verdict: Estimate panel shows NaN for zero-income calculation [application_issue/ui_data_defect, confidence 0.95]
Assert the estimate panel keeps the row order Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld, and that Gross income shows $0, Deductions shows $14,600, Taxable income shows $0, all visible amounts use whole-dollar US currency, and the total label is either "Estimated refund" or "Estimated amount you owe".

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 — assert ⏭ skipped
