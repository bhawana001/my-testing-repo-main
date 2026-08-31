---
test: ../married-filing-jointly-applies-the-29-200-standard-deduction_test.md
status: failed
started: 2026-08-27T14:12:27.239Z
duration_s: 137
session_id: 1ec18ed3-ef28-42db-81da-3bb54efdac48
---

# Married filing jointly applies the $29,200 standard deduction live — Result

## Step 1 ✓ passed (28.3s)
md5: 22b83e6b14849ea034de5af4bb189884
Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2 ✓ passed (51.2s)
md5: 35ef1dcd2edc7d37110dbccfcfe5f637
On the calculator page, enter annual income 85000, select filing status Married filing jointly, keep the standard deduction selected, and wait for the estimate panel to update while staying on the calculator page.

## Step 3 ✗ failed (55.5s)
md5: e3011cd8153734599d31ee42a57ae955
Reason: AP determined agent is stuck — no viable actions remain — bug verdict: Estimate panel renders NaN for gross and taxable income [application_issue/ui_data_defect, confidence 0.95]
Assert the estimate panel lists Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld in that order, and that Gross income shows $85,000 while the Deductions row shows $29,200.

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 — assert ⏭ skipped
