---
mode: testing
url: https://my-testing-repo-main.vercel.app/ebay/best-offer?reset=true
max_steps: 40
tags: [ebay, e-commerce, wizard]
---

# eBidz 6.3: Best Offer flow

Catalog objective: submit a best offer below asking and verify the pending state.
Key assertion: the offer shows as sent with the correct amount.

## Open the listing
Go to https://my-testing-repo-main.vercel.app/ebay/best-offer?reset=true and verify "Analog Synthesizer · 37 keys · Boxed" with Buy It Now "$240.00", the text "or Best Offer", and an enabled "Make offer" button.

## Offer too low
Click "Make offer", type "100" into "Your offer", click "Send offer", and verify the message "Offers below $150.00 are automatically declined by this seller."

## Valid offer
Clear the offer field, type "200", click "Send offer", and verify the modal closes and the message "Offer sent. The seller has until Sep 16, 2026 to respond." appears.

## Verify the pending offer
Verify "Your offer" reads "$200.00", the status badge reads "Pending", and the button now reads "Offer pending" and is disabled.
