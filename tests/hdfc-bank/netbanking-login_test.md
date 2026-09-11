---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/netbanking-login?reset=true
max_steps: 40
tags: [hdfc-bank, banking, auth]
---

# HDFB Bank 24.1: NetBanking login

Catalog objective: log in with customer ID and OTP in the test environment.
Key assertion: the account summary renders balances.

## Open NetBanking login
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/netbanking-login?reset=true and verify the "NetBanking login" form with "Customer ID / User ID" and "Password" fields.

## Enter credentials
Type "DEMO12345" into Customer ID / User ID and "Demo123!" into Password, click "Continue", and verify the "Verify it's you" step asks for a Verification code.

## Enter the OTP
Type "123456" into Verification code, click "Verify and continue", and verify the "Account summary" page is shown with "Signed in as Demo User".

## Verify balances
Verify the balance cards show "Savings Account •••• 7712" with "₹1,84,250.40", "Current Account •••• 3301" with "₹52,110.00" and "Fixed Deposit" with "₹5,00,000.00", and the Accounts table lists the same three balances.
