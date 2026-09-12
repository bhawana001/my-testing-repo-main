---
test: ../declined-card-recovery_test.md
status: passed
started: 2026-09-11T17:03:33.194Z
duration_s: 201
session_id: e1e7bca1-f3cc-4df1-8948-73499ccba7ed
---

# Stripely 9.3: Declined card recovery — Result

## Open the checkout ✓ passed (54.6s)
md5: 5ff167542cf09a1651660855431c8930
Go to https://my-testing-repo-main.vercel.app/stripe/declined-card-recovery?reset=true and verify the page shows "Pay Bloom & Co." with the amount "$64.50".

## Pay with the decline card ✓ passed (62.4s)
md5: bbb6da05eab133bd7bd0e734a7162c2e
Type "4000 0000 0000 0002" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $64.50" button, and verify the inline error "Your card was declined. Try a different payment method." appears above the button with the text "1 declined attempt so far".

## Retry with the valid card ✓ passed (40.3s)
md5: c8f93399e0c73e9cf3a3c85ecc29d1ec
Clear the Card number field, type "4242 4242 4242 4242", click the "Pay $64.50" button, and verify the heading "Payment successful" appears.

## Verify the recovery ✓ passed (39.8s)
md5: 9dec567fe28231373a0bf53376ceecfe
Verify "Attempts" reads "2", "Payment method" reads "Visa •••• 4242" and "Status" reads "Succeeded".
