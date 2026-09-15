---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen-clone-app/checkout?reset=true
max_steps: 40
tags: [adyen, payments, tokenisation]
---

# Adyeen 13.3: Stored card reuse

Catalog objective: pay again using a previously stored card token.
Key assertion: the one-click payment succeeds without card entry.

## Verify the stored card is preselected
Verify "Stored payment method" is selected and "Stored card" reads "Visa ending 1111 · exp 03/30".

## Verify no card entry is required
Verify a badge reads "No card entry needed — paying with a stored token" and no card number field is shown.

## Pay with the token
Click "Pay €129.50" and verify a green banner titled "Payment authorised" appears.

## Verify the token was used
Verify the result shows "Method" of "Stored card", "Detail" of "Visa ending 1111 (token tok_8812)" and "Amount" of "€129.50".
