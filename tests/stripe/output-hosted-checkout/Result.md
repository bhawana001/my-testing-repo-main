---
test: ../hosted-checkout_test.md
status: passed
started: 2026-09-11T16:57:19.496Z
duration_s: 125
session_id: 58ce1a34-631c-400e-bedf-c1bae5296d8b
---

# Stripely 9.1: Hosted Checkout session — Result

## Open the hosted checkout ✓ passed (26.8s)
md5: dc2646aa36f6ae9a99fb7b8118736a32
Go to https://my-testing-repo-main.vercel.app/stripe/hosted-checkout?reset=true and verify the page shows "Pay Acme Cloud" with the amount "$79.00" and a "TEST MODE" badge.

## Pay with the test card ✓ passed (51.9s)
md5: fd55d3d2aca01e8481291690c2f79738
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, then click the "Pay $79.00" button and verify the heading "Payment successful" appears.

## Verify the amount ✓ passed (41.9s)
md5: 128f371d968b67934f2ffe73cd79ce11
Verify "Amount paid" reads "$79.00", "Payment method" reads "Visa •••• 4242" and "Status" reads "Succeeded".
