---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart/grocery-substitution?reset=true
max_steps: 40
tags: [walmart, e-commerce, checkout]
---

# Walmartly 4.2: Grocery substitution

Catalog objective: add groceries, enable substitutions on one item, place a test order.
Key assertion: the substitution preference is saved on the item.

## Open the grocery cart
Go to https://my-testing-repo-main.vercel.app/walmart/grocery-substitution?reset=true and verify the cart contains "Organic Whole Milk 1L", "Bananas (bunch)" and "Sourdough Loaf", each showing "No substitutions".

## Enable substitutions on the milk
Click the "Allow substitutions for Organic Whole Milk 1L" switch and verify the badge "Substitutions allowed" appears under the milk item only.

## Reload and check persistence
Reload the page without the reset parameter and verify the milk item still shows "Substitutions allowed".

## Check out
Click "Proceed to checkout", click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify the preference on the order
Verify the confirmation's item list shows "Substitutions allowed" under "Organic Whole Milk 1L" and "No substitutions" under "Sourdough Loaf".
