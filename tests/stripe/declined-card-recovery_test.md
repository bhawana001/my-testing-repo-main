---
mode: testing
url: https://my-testing-repo-main.vercel.app/stripe-clone-app/checkout?reset=true
max_steps: 45
tags: [stripe, payments, errors]
---

# Stripey 9.3: Declined card recovery

Catalog objective: attempt a payment with a decline test card, then retry with a valid card.
Key assertion: the error is surfaced inline and the retry succeeds.

## Attempt with the declining card
Type "4000 0000 0000 0002" into "Card number", "12 / 34" into "Expiry", "123" into "CVC", click "Pay $240.00", and verify an inline error under "Card number" reads "Your card was declined. Try a different card."

## Verify the form is still usable
Verify the "Card number", "Expiry" and "CVC" fields are all still present and editable on the same page.

## Retry with a working card
Replace the card number with "4242 4242 4242 4242" and click "Pay $240.00".

## Verify the retry succeeded
Verify a green banner titled "Payment successful" appears, the receipt shows "Amount paid" of "$240.00" and "Card" of "Visa ••••4242", and a badge reads "Succeeded after 1 declined attempt".
