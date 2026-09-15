---
test: ../credit-decline-fallback_test.md
status: passed
started: 2026-09-13T11:20:54.147Z
duration_s: 178
session_id: 76f6533b-0349-40a7-9f49-e38f3cb9f39e
---

# Klarnah 14.2: Credit decision decline path — Result

## Open the merchant checkout ✓ passed (25.8s)
md5: 43a6c1f371e88c6f2a8c35e5f8de3aa3
Go to https://my-testing-repo-main.vercel.app/klarna/credit-decline-fallback?reset=true and verify "Pay Studio Lamps" with amount "$640.00" and the "Klarnah · Pay in 4" option selected.

## Start Klarnah with the decline email ✓ passed (53.6s)
md5: 0b578d2414268a7ee3797e0dec7da8e5
Click "Continue with Klarnah", type "decline@evals.dev" into Email and "+1 555 010 0123" into Mobile number, click "Continue", type "123456" into Verification code, click "Verify", and verify the message "We can't offer Pay in 4 for this purchase" is shown.

## Return to the merchant ✓ passed (28.6s)
md5: 0be3d703ec5a10f885821565a35c526d
Click "Back to merchant" and verify the merchant page shows the banner "Klarnah couldn't approve Pay in 4 for this order. Please choose another payment method below." with the Klarnah option marked "Unavailable for this order".

## Pay by card instead ✓ passed (68.4s)
md5: a1ece423c882e03827933394400c6853
Click the "Credit or debit card" option, Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $640.00" button, and verify "Order confirmed" appears with "Fallback used" reading "Yes, after Klarnah decline".
