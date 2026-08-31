---
assurance:
  id: t-2
  base: sha256:1a596632fd29bcca3a52ee62911edb178e69e889ce5dd7c0b6cb35b7f7ea63ef
---
# Taxable income stays at zero for Single incomes at and below the deduction boundary

> Prove taxable income never drops below zero when gross income does not exceed the active deduction.

## Step 1

Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2

On the calculator page, keep filing status set to Single with the standard deduction selected, enter annual income 0, and wait for the estimate panel to update on the same page.

## Step 3

Assert the estimate panel keeps the row order Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld, and that Gross income shows $0, Deductions shows $14,600, Taxable income shows $0, all visible amounts use whole-dollar US currency, and the total label is either "Estimated refund" or "Estimated amount you owe".

## Step 4

Replace the annual income with 14599 and wait for the live estimate to refresh; assert Gross income shows $14,599 and Taxable income remains $0 without any submit action or full page reload.

## Step 5

Replace the annual income with 14600 and wait for the live estimate to refresh; assert Gross income shows $14,600 and Taxable income remains $0 without any submit action or full page reload.

## Step 6 — assert @verifies ac-1, ac-2, ac-3, ac-4, ac-5, ac-8, ac-9, ac-10, ac-12

Confirm absolute check: max(gross income minus the active deduction, 0), displayed as whole-dollar US currency (equals) — the stated promise: The Taxable income row equals gross income minus the active deduction, floored at zero, and is displayed as whole-dollar US currency.
