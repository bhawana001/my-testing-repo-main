---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe/declined-card-recovery?reset=true
max_steps: 40
tags: [stripe, payments-infra, checkout]
---

# Stripely 9.3: Declined card recovery

Catalog objective: attempt payment with the decline test card, then retry with a valid card.
Key assertion: the error is surfaced inline and the retry succeeds.

## Open the checkout
Go to https://my-testing-repo-main.vercel.app/stripe/declined-card-recovery?reset=true and verify the page shows "Pay Bloom & Co." with the amount "$64.50".

## Pay with the decline card
Type "4000 0000 0000 0002" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $64.50" button, and verify the inline error "Your card was declined. Try a different payment method." appears above the button with the text "1 declined attempt so far".

## Retry with the valid card
Clear the Card number field, type "4242 4242 4242 4242", click the "Pay $64.50" button, and verify the heading "Payment successful" appears.

## Verify the recovery
Verify "Attempts" reads "2", "Payment method" reads "Visa •••• 4242" and "Status" reads "Succeeded".
