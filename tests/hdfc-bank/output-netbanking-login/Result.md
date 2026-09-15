---
test: ../netbanking-login_test.md
status: passed
started: 2026-09-13T12:21:36.013Z
duration_s: 146
session_id: 611141df-aba4-4963-866a-ff1f8b95d8cc
---

# HDFB Bank 24.1: NetBanking login — Result

## Open NetBanking login ✓ passed (26.6s)
md5: 66f9d242d119cd524cd6910c48448e03
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/netbanking-login?reset=true and verify the "NetBanking login" form with "Customer ID / User ID" and "Password" fields.

## Enter credentials ✓ passed (33.3s)
md5: 7a9937f1a96a0128a05699a8c762ef4b
Type "DEMO12345" into Customer ID / User ID and "Demo123!" into Password, click "Continue", and verify the "Verify it's you" step asks for a Verification code.

## Enter the OTP ✓ passed (31.7s)
md5: c51fb39622b4334f0600a64601a9cf2c
Type "123456" into Verification code, click "Verify and continue", and verify the "Account summary" page is shown with "Signed in as Demo User".

## Verify balances ✓ passed (52.7s)
md5: 17fad7ec88324fe88db515f44328f8e7
Verify the balance cards show "Savings Account •••• 7712" with "₹1,84,250.40", "Current Account •••• 3301" with "₹52,110.00" and "Fixed Deposit" with "₹5,00,000.00", and the Accounts table lists the same three balances.
