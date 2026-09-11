---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/tip-adjustment?reset=true
max_steps: 40
tags: [instacart, e-commerce, checkout]
---

# Instakart 7.4: Tip adjustment

Catalog objective: adjust the tip after checkout from the order page.
Key assertion: the updated tip is reflected in the order total.

## Check out with the default tip
Go to https://my-testing-repo-main.vercel.app/instacart/tip-adjustment?reset=true, click "Proceed to checkout", click "Continue to payment", and verify the "Add a tip for your shopper" card has "$2.00" selected and the "Order total" reads "$19.46".

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify the confirmation shows "Order total" as "$19.46".

## Adjust the tip on the order page
In the "Shopper tip" card, click "$5.00" and verify "Tip included: $5.00" is shown.

## Verify the updated total
Verify the "Updated order total" reads "$22.46" ($19.46 − $2.00 + $5.00).
