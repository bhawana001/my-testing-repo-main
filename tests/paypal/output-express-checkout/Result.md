---
test: ../express-checkout_test.md
status: passed
started: 2026-09-11T17:07:13.118Z
duration_s: 263
session_id: 5e990868-7911-44fd-9917-3ca74c81c9f0
---

# PayPally 10.1: Express checkout button — Result

## Open the merchant page ✓ passed (37.9s)
md5: 6a2ebbc014d8fc5f80461fe1e45d75c5
Go to https://my-testing-repo-main.vercel.app/paypal/express-checkout?reset=true and verify the page shows "Pay Trailhead Outfitters" with amount "$89.99" and a yellow "Pay with PayPally" button.

## Open the popup ✓ passed (29.6s)
md5: d83340aa7ea629d4d8677882ccc51296
Click "Pay with PayPally" and verify a popup window with the address "sandbox.paypally.com/checkoutnow" opens.

## Fail login once ✓ passed (53.5s)
md5: 93e60361939b0df4a752ae249c8b6f42
Type "demo@evals.dev" into Email and "wrongpass" into Password, click "Log In", and verify the message "Some of your info isn't correct" is shown.

## Log in correctly ✓ passed (57.4s)
md5: 8859d8e9f91994f8c86baf7dbf035d38
Clear the Password field, type "Demo123!", click "Log In", and verify the popup shows "Pay $89.99 to Trailhead Outfitters" with a "Pay Now" button.

## Approve ✓ passed (50s)
md5: 79977b4aa319ddfcbe51a99b8e18b61b
Click "Pay Now" and verify the popup closes and the merchant page shows the heading "Order complete".

## Verify the order ✓ passed (31.9s)
md5: feedcfa975accf5d83bce1e9f8121115
Verify "Amount paid" reads "$89.99", "Merchant order" reads "TO-55019" and "Popup" reads "Approved and closed".
