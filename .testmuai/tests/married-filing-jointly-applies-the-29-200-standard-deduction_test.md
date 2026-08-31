---
assurance:
  id: t-4
  base: sha256:eb76eeb4d252c2683843f1c0d64f5c20b91b58037350821eaf56e99a98629c84
---
# Married filing jointly applies the $29,200 standard deduction live

> Prove choosing Married filing jointly changes the Deductions row to the married standard deduction amount.

## Step 1

Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2

On the calculator page, enter annual income 85000, select filing status Married filing jointly, keep the standard deduction selected, and wait for the estimate panel to update while staying on the calculator page.

## Step 3

Assert the estimate panel lists Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld in that order, and that Gross income shows $85,000 while the Deductions row shows $29,200.

## Step 4

Assert every visible calculator amount is formatted as whole-dollar US currency and that the total label is either "Estimated refund" or "Estimated amount you owe".

## Step 5

Confirm the estimate changed from typing or filing-status selection alone, with no submit button interaction and no full page reload or hard navigation away from http://localhost:3000/bank-clone-app/calculators.

## Step 6 — assert @verifies ac-6, ac-1, ac-2, ac-3, ac-4, ac-8, ac-9, ac-10, ac-12

Confirm absolute check: $29,200 (equals) — the stated promise: With filing status set to Married filing jointly and the standard deduction selected, the Deductions row shows $29,200.
