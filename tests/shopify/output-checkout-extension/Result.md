---
test: ../checkout-extension_test.md
status: passed
started: 2026-09-11T15:58:51.754Z
duration_s: 276
session_id: 2f74f6dd-3fe0-4229-b2fa-4267dbc0ddaa
---

# Shopifly 2.3: Checkout extension render — Result

## Open the cart and proceed ✓ passed (39s)
md5: d9e930275f24c752d604158966fe1bd1
Go to https://my-testing-repo-main.vercel.app/shopify/checkout-extension?reset=true, click "Proceed to checkout", and verify a "Custom fields" card labelled "Checkout extension" is shown with "Gift message (optional)" and "Delivery instructions" fields.

## Fill the custom fields ✓ passed (59.9s)
md5: e2437b9c782697e22c2735683f0d5a9a
Type "Happy birthday!" into Gift message and "Side door" into Delivery instructions, click "Continue to payment", and verify a "Complete the look" card labelled "Upsell block" offering "Everyday Crew Socks (3-pack)" is shown above the Payment form.

## Add the upsell ✓ passed (63s)
md5: f04198ecfc800279ce0b095e22e3e15a
Click the "Add" button in the upsell block and verify the badge "Added" appears and the "Order total" row reads "$30.00" ($18.00 tee + $8.00 socks + $4.00 shipping).

## Pay ✓ passed (44.5s)
md5: c9a781a49be86854267218aaa05992c9
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $30.00" button, and verify "Order placed" is shown.

## Verify the extension data on the confirmation ✓ passed (65.8s)
md5: 45da06b522ca2e5e7001cf8b48d9e7e6
Verify the confirmation lists "Gift message" as "Happy birthday!", "Delivery instructions" as "Side door", and both items "Everyday Cotton Tee" and "Everyday Crew Socks (3-pack)".
