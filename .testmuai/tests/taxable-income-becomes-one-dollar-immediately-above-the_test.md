---
assurance:
  id: t-3
  base: sha256:478833e140427bb571bca7029f5bce178a7034be7306fc3b75729b00f97548a6
---
# Taxable income becomes one dollar immediately above the Single deduction boundary

> Prove the taxable-income calculation crosses from zero to a positive whole-dollar amount immediately above the deduction threshold.

## Step 1

Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2

On the calculator page, enter annual income 14601, keep filing status set to Single, keep the standard deduction selected, and wait for the estimate panel to update while remaining on the calculator page.

## Step 3

Assert the estimate panel lists Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld in that order, and that Gross income shows $14,601 while Deductions shows $14,600.

## Step 4

Assert the Taxable income row shows $1, every visible calculator amount is formatted as whole-dollar US currency, and the total label is either "Estimated refund" or "Estimated amount you owe".

## Step 5

Confirm the estimate changed from typing alone, with no submit button interaction and no full page reload or hard navigation away from http://localhost:3000/bank-clone-app/calculators.

## Step 6 — assert @verifies ac-1, ac-2, ac-3, ac-4, ac-5, ac-8, ac-9, ac-10, ac-12

Confirm absolute check: max(gross income minus the active deduction, 0), displayed as whole-dollar US currency (equals) — the stated promise: The Taxable income row equals gross income minus the active deduction, floored at zero, and is displayed as whole-dollar US currency.
