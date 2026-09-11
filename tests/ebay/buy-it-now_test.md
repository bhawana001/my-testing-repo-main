---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/buy-it-now?reset=true
max_steps: 40
tags: [ebay, e-commerce, checkout]
---

# eBidz 6.2: Buy It Now checkout

Catalog objective: purchase a Buy It Now listing with saved payment.
Key assertion: the order confirmation shows the correct item and price.

## Open the listing
Go to https://my-testing-repo-main.vercel.app/ebay/buy-it-now?reset=true and verify the listing "Vintage Film Camera · 35mm · Fully working" shows a Buy It Now price of "$185.00".

## Buy It Now
Click the "Buy It Now" button and verify the review page shows the item, the "Subtotal" as "$185.00", "Shipping" as "$12.00" and "Order total" as "$197.00".

## Confirm with the saved card
Click "Confirm and pay" and verify the saved card "Visa •••• 4242" is selected.

## Pay
Click the "Pay $197.00" button and verify "Order placed" is shown.

## Verify the confirmation
Verify the confirmation shows an Order number starting with "EB-", the item "Vintage Film Camera · 35mm · Fully working" at "$185.00", "Payment" as "Visa •••• 4242" and "Order total" as "$197.00".
