---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal/express-checkout?reset=true
max_steps: 40
tags: [paypal, payments-infra, checkout]
---

# PayPally 10.1: Express checkout button

Catalog objective: pay on a merchant sandbox via the PayPally button and approve in the popup.
Key assertion: popup approval returns to the merchant and the order completes.

## Open the merchant page
Go to https://my-testing-repo-main.vercel.app/paypal/express-checkout?reset=true and verify the page shows "Pay Trailhead Outfitters" with amount "$89.99" and a yellow "Pay with PayPally" button.

## Open the popup
Click "Pay with PayPally" and verify a popup window with the address "sandbox.paypally.com/checkoutnow" opens.

## Fail login once
Type "demo@evals.dev" into Email and "wrongpass" into Password, click "Log In", and verify the message "Some of your info isn't correct" is shown.

## Log in correctly
Clear the Password field, type "Demo123!", click "Log In", and verify the popup shows "Pay $89.99 to Trailhead Outfitters" with a "Pay Now" button.

## Approve
Click "Pay Now" and verify the popup closes and the merchant page shows the heading "Order complete".

## Verify the order
Verify "Amount paid" reads "$89.99", "Merchant order" reads "TO-55019" and "Popup" reads "Approved and closed".
