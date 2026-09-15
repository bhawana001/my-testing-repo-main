---
test: ../best-offer_test.md
status: passed
started: 2026-09-13T10:28:31.136Z
duration_s: 163
session_id: 71a6d1f7-b4cd-4079-8f32-5dd469f38d1a
---

# eBidz 6.3: Best Offer flow — Result

## Open the listing ✓ passed (28.7s)
md5: 9852edfff03010451e7bb28a56729dc9
Go to https://my-testing-repo-main.vercel.app/ebay/best-offer?reset=true and verify "Analog Synthesizer · 37 keys · Boxed" with Buy It Now "$240.00", the text "or Best Offer", and an enabled "Make offer" button.

## Offer too low ✓ passed (36.3s)
md5: f9146441f79649e9caf5850d62d281aa
Click "Make offer", type "100" into "Your offer", click "Send offer", and verify the message "Offers below $150.00 are automatically declined by this seller."

## Valid offer ✓ passed (38.7s)
md5: 973870d6a40790468ede7358cfbc9617
Clear the offer field, type "200", click "Send offer", and verify the modal closes and the message "Offer sent. The seller has until Sep 16, 2026 to respond." appears.

## Verify the pending offer ✓ passed (57.9s)
md5: be90238f495803628f4b50fa375870a6
Verify "Your offer" reads "$200.00", the status badge reads "Pending", and the button now reads "Offer pending" and is disabled.
