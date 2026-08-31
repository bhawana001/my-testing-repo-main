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
  id: t-7
  base: sha256:3a983f1f3432c54e4124647edcc0611b976bed8a0c956a501d2b7f47bd1c65e0
---
# Calculators header link navigates to Open Account

> Prove that the bank header is present on the Calculators page and that its Open Account link navigates to `/bank-clone-app/open-account`.

## Step 1

Open {{calculators_page_url}} in the browser and wait until the Calculators page is fully loaded with the bank header visible at the top of the page.

## Step 2

In the bank header on the Calculators page, follow the Open Account link and allow the site to finish navigating to the destination page.

## Step 3

On the loaded Open Account page, confirm that the bank header is still visible at the top of the page.

## Step 4 — assert @verifies ac-15, ac-16, ac-17

Confirm absolute check: /bank-clone-app/open-account (equals) — the stated promise: From the Calculators page, the header link to Open Account resolves to `/bank-clone-app/open-account`.
