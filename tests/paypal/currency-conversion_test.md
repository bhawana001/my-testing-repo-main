---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/currency-conversion?reset=true
max_steps: 45
tags: [paypal, payments-infra, wizard]
---

# PayPally 10.5: Currency conversion display

Catalog objective: send an international payment and verify the conversion rate shown.
Key assertion: the rate and converted amount are displayed before confirming.

## Enter the amount
Go to https://my-testing-repo-main.vercel.app/paypal/currency-conversion?reset=true, keep "200" in "You send (USD)" to Asha Rao (India), click "Continue", and verify "Review before you send".

## Verify rate and amount before confirming
Verify "Exchange rate" reads "1 USD = 81.54 INR" with the note about a 2% spread on 83.20, "Transfer fee" "$4.99", "Total you pay" "$204.99", and "Asha receives" "₹16,308.00", while the "Send now" button has not been clicked yet.

## Confirm
Click "Send now" and verify "You sent $200.00 · Asha receives ₹16,308.00".
