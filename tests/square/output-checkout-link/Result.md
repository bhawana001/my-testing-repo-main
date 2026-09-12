---
test: ../checkout-link_test.md
status: failed
started: 2026-09-12T00:27:24.843Z
duration_s: 14415
session_id: c6e3f660-da30-4351-99c6-1eab9b65e3bf
---

# Squarely 12.1: Online checkout link — Result

## Open the checkout link ✓ passed (94.7s)
md5: 4a892febd007dba1e37ce6da0ece145b
Go to https://my-testing-repo-main.vercel.app/square/checkout-link?reset=true and verify "Pay Bean There Coffee" with amount "$35.00" and the note "Squarely Online Checkout link".

## Pay ✗ failed (262.8s)
md5: fa7b85d16eec2e58f2f517c0045bb5a4
Reason: AP produced no action for 3 consecutive steps
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $35.00" button, and verify the heading "Receipt" appears.

## Verify the receipt ⏭ skipped
