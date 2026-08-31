---
assurance:
  id: t-1
  base: sha256:1397d833c2093366d0077ebbd5d094529d60fbd6bcfb7abf677a255ab799a4f4
---
# Single standard deduction example recalculates live and shows the ordered estimate breakdown

> Prove the calculator recalculates live without submit or reload and presents the ordered estimate breakdown, gross income echo, Single standard deduction, and an allowed total label.

## Step 1

Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2

On the calculator page, enter annual income 85000, keep filing status set to Single, keep the standard deduction selected, and wait for the estimate panel to update while staying on the calculator page.

## Step 3

Assert the estimate panel lists Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld in that order, and that the Gross income row shows $85,000 while the Deductions row shows $14,600.

## Step 4

Assert the Taxable income row shows $70,400, every visible calculator amount is formatted as whole-dollar US currency, and the total label is either "Estimated refund" or "Estimated amount you owe".

## Step 5

Confirm the estimate updated from typing alone, with no submit button interaction and no full page reload or hard navigation away from http://localhost:3000/bank-clone-app/calculators.

## Step 6 — assert @verifies ac-13, ac-14, ac-2, ac-3, ac-4, ac-5, ac-8, ac-9, ac-10, ac-12

Confirm absolute check: $70,400 (equals) — the stated promise: With an annual income of 85000, Single, and the standard deduction, the Taxable income row shows $70,400.
