---
test: ../ideal-redirect_test.md
status: passed
started: 2026-09-13T11:14:28.408Z
duration_s: 136
session_id: f5873d44-3eba-4868-bed4-0afb422db97f
---

# Adyenly 13.2: Local method iDEAL — Result

## Open the iDEAL payment ✓ passed (28.7s)
md5: fb40f595f317aa586548a09f7160fed7
Go to https://my-testing-repo-main.vercel.app/adyen/ideal-redirect?reset=true and verify "Pay with iDEAL" with a "Select your bank" dropdown and amount "€58.90".

## Choose the test issuer ✓ passed (37.1s)
md5: 915b614f38be5e5b10d05222fa40a442
Select "Test Issuer (Success)" in the bank dropdown, click "Continue to Test Issuer (Success)", and verify an "Issuer simulation" page for "Test Issuer (Success)" shows "Pay to Nordic Home" and "Amount €58.90".

## Confirm at the issuer ✓ passed (23.9s)
md5: 26c1ae685946f84246a5bffd4d2021ba
Click "Confirm payment" and verify the merchant page shows the heading "Result: Authorised".

## Verify the return ✓ passed (45.2s)
md5: e3cb50c40d017fc73b51a28268d741ce
Verify "Payment method" reads "iDEAL · Test Issuer (Success)", "Returned from" reads "issuer redirect" and "Payment ID" reads "IDL-7731".
