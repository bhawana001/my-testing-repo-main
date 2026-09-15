---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay-clone-app?reset=true
max_steps: 40
tags: [ebay, checkout]
---

# eBid 6.2: Buy It Now checkout

Catalog objective: purchase a Buy It Now listing with saved payment.
Key assertion: order confirmation shows the correct item and price.

## Open a Buy It Now listing
Click "Studio Monitor Headphones" and verify the listing shows a price of "$129.99" and shipping of "Free".

## Confirm the saved payment method
Verify the buy panel shows "Paying with Visa ending in 4242".

## Buy it now
Click "Buy It Now — $129.99" and verify the page shows "Order confirmed" for "Studio Monitor Headphones" with a total paid of "$129.99".

## Confirm the purchase is recorded
Click "My eBid" and verify the purchases list shows "Studio Monitor Headphones" at "$129.99" paid with "Visa ••••4242".
