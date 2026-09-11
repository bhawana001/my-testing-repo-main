---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/credit-decline-fallback?reset=true
max_steps: 40
tags: [klarna, payments-infra, checkout]
---

# Klarnah 14.2: Credit decision decline path

Catalog objective: trigger a declined credit decision and verify the merchant fallback.
Key assertion: the shopper is returned to other payment options.

## Open the merchant checkout
Go to https://my-testing-repo-main.vercel.app/klarna/credit-decline-fallback?reset=true and verify "Pay Studio Lamps" with amount "$640.00" and the "Klarnah · Pay in 4" option selected.

## Start Klarnah with the decline email
Click "Continue with Klarnah", type "decline@evals.dev" into Email and "+1 555 010 0123" into Mobile number, click "Continue", type "123456" into Verification code, click "Verify", and verify the message "We can't offer Pay in 4 for this purchase" is shown.

## Return to the merchant
Click "Back to merchant" and verify the merchant page shows the banner "Klarnah couldn't approve Pay in 4 for this order. Please choose another payment method below." with the Klarnah option marked "Unavailable for this order".

## Pay by card instead
Click the "Credit or debit card" option, Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $640.00" button, and verify "Order confirmed" appears with "Fallback used" reading "Yes, after Klarnah decline".
