---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen-clone-app/checkout?reset=true
max_steps: 45
tags: [adyen, payments, checkout]
---

# Adyeen 13.1: Drop-in payment

Catalog objective: pay via the Adyeen drop-in with a test card and 3DS2.
Key assertion: the authorised result is surfaced to the shopper.

## Choose the card method
Verify the page subtitle reads "Northwind Software · €129.50", then choose "Card" in the drop-in.

## Use the 3DS2 test card
Type "4212 3456 7890 1237" into "Card number", "03 / 30" into "Expiry", "737" into "CVC", and click "Pay €129.50".

## Complete the 3DS2 challenge
Verify a dialog titled "3DS2 authentication" opens showing "Amount" of "€129.50", then click "Complete authentication".

## Verify the authorised result
Verify a green banner titled "Payment authorised" shows "Result code" of "Authorised" for ORD-55120, with "PSP reference" of "PSP883000001717", "Method" of "Card", "Amount" of "€129.50" and a badge reading "3DS2 authentication completed".
