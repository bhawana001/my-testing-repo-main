---
assurance:
  id: t-6
  base: sha256:f6970aa0f8ff01e3196b12e3fb730cc385b46688c00d144cce6711c5a2684129
---
# Selecting Itemized reveals the itemized deductions input live

> Prove choosing Itemized exposes the itemized deductions input control.

## Step 1

Open http://localhost:3000/bank-clone-app/calculators in desktop Chrome and confirm the Federal Income Tax Calculator is visible.

## Step 2

On the calculator page, enter annual income 85000, keep filing status set to Single, choose Itemized as the deduction type, and wait for the estimate panel to update while remaining on the calculator page.

## Step 3

Assert an itemized deductions input is now visible and available on the calculator page.

## Step 4

Assert the estimate panel still lists Gross income, Deductions, Taxable income, Tax liability, and Taxes withheld in that order, that Gross income shows $85,000, and that every visible calculator amount uses whole-dollar US currency formatting.

## Step 5

Confirm the estimate changed from typing or deduction-type selection alone, with no submit button interaction and no full page reload or hard navigation away from http://localhost:3000/bank-clone-app/calculators, and that the total label is either "Estimated refund" or "Estimated amount you owe".

## Step 6 — assert @verifies ac-11, ac-2, ac-3, ac-4, ac-8, ac-9, ac-10, ac-12

Confirm presence check: an itemized deductions input after "Itemized" is chosen (exists) — the stated promise: Choosing "Itemized" reveals an itemized deductions input.
