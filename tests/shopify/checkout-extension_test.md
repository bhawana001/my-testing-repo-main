---
mode: testing
url: https://my-testing-repo-main.vercel.app/shopify/checkout-extension?reset=true
max_steps: 40
tags: [shopify, e-commerce, checkout]
---

# Shopifly 2.3: Checkout extension render

Catalog objective: proceed through checkout and confirm custom fields and the upsell block appear.
Key assertion: the extension renders without breaking the payment step.

## Open the cart and proceed
Go to https://my-testing-repo-main.vercel.app/shopify/checkout-extension?reset=true, click "Proceed to checkout", and verify a "Custom fields" card labelled "Checkout extension" is shown with "Gift message (optional)" and "Delivery instructions" fields.

## Fill the custom fields
Type "Happy birthday!" into Gift message and "Side door" into Delivery instructions, click "Continue to payment", and verify a "Complete the look" card labelled "Upsell block" offering "Everyday Crew Socks (3-pack)" is shown above the Payment form.

## Add the upsell
Click the "Add" button in the upsell block and verify the badge "Added" appears and the "Order total" row reads "$30.00" ($18.00 tee + $8.00 socks + $4.00 shipping).

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $30.00" button, and verify "Order placed" is shown.

## Verify the extension data on the confirmation
Verify the confirmation lists "Gift message" as "Happy birthday!", "Delivery instructions" as "Side door", and both items "Everyday Cotton Tee" and "Everyday Crew Socks (3-pack)".
