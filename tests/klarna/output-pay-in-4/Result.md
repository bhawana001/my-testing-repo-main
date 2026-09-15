---
test: ../pay-in-4_test.md
status: passed
started: 2026-09-14T10:08:45.473Z
duration_s: 265
session_id: db4df4a0-a275-4707-9017-477e38aab598
---

# Klarnah 14.1: Pay in 4 selection — Result

## Open the merchant checkout ✓ passed (45.1s)
md5: ad1721a0b72eb655a88e1c400105efa5
Go to https://my-testing-repo-main.vercel.app/klarna/pay-in-4?reset=true and verify "Pay Studio Lamps" with amount "$180.00" and the option "Klarnah · Pay in 4" described as "4 payments of $45.00, interest-free".

## Start Klarnah signup ✓ passed (36.7s)
md5: a10ad22a95507136ffbc77491735098d
Click "Continue with Klarnah" and verify a Klarnah window opens asking for Email and Mobile number.

## Enter contact details ✓ passed (63.1s)
md5: 6141564140fa3d48df5a0b37049ccbe4
Type "demo@evals.dev" into Email and "+1 555 010 0123" into Mobile number, click "Continue", and verify a "Verification code" field appears.

## Verify the code ✓ passed (66.8s)
md5: 3c7d1d842b675b2df5b35cde39710618
Type "123456" into Verification code, click "Verify", and verify "Your payment schedule" is shown listing "Today · Sep 14, 2026" $45.00, "Payment 2 · Sep 28, 2026" $45.00, "Payment 3 · Oct 12, 2026" $45.00, "Payment 4 · Oct 26, 2026" $45.00 and "Total" $180.00.

## Confirm ✓ passed (47.7s)
md5: de9b6cb5865c610155a1e18847f6e873
Click "Confirm and pay $45.00 today" and verify the merchant page shows "Order confirmed" with "Instalment 2 · Sep 28, 2026" reading "$45.00".
