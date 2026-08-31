---
mode: testing
max_steps: 30
target: chrome
variables:
  calculators_page_url:
    value: "http://localhost:3000/bank-clone-app/calculators"
  open_account_page_url:
    value: "http://localhost:3000/bank-clone-app/open-account"
assurance:
  id: t-8
  base: sha256:e505b24ff92d5be71929549edf57cb641e729de48f7aced7af0ea59b00833c4f
---
# Open Account page shows the persistent bank header

> Prove that the persistent bank header appears on the Open Account page.

## Step 1

Open {{open_account_page_url}} in the browser and wait until the Open Account page is fully loaded.

## Step 2

On the Open Account page, inspect the top site header area and confirm that the bank header is visible.

## Step 3 — assert @verifies ac-17

Confirm presence check: bank header (exists) — the stated promise: The bank header is present on the Open Account page.
