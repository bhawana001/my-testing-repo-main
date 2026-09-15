---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-clone-app/login?reset=true
max_steps: 45
tags: [hdfc-bank, banking, auth]
---

# Hindfirst Bank 24.1: NetBanking login

Catalog objective: log in with a customer id and an OTP in the test environment.
Key assertion: the account summary renders the balances.

## Enter the credentials
Type "HF4471902" into "Customer id", type "Netbank@2026" into "Password", click "Continue", and verify the page moves to the step titled "Step 2 — one time password".

## Verify the second factor is required
Verify the OTP step shows "Sent to" of "•••••• 4418" and an "OTP" field.

## Enter the OTP
Type "481902" into "OTP" and click "Verify and sign in", then verify the page moves to the account summary for "Priya Nair".

## Verify the balances rendered
Verify the "Deposit accounts" card shows "Savings Account" of "₹284,530.75", "Current Account" of "₹91,240.00" and "Total relationship value" of "₹375,770.75".
