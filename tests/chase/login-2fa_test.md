---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase-clone-app?reset=true
max_steps: 45
tags: [chase, banking, auth]
---

# Chaise Bank 23.1: Login with 2FA

Catalog objective: log in with an OTP challenge.
Key assertion: the dashboard loads with masked accounts.

## Enter the credentials
Type "priya.nair" into "Username", type "Bank2026!" into "Password", and click "Sign in".

## Verify the second step is required
Verify a two-step verification banner appears with a "One-time code" field.

## Enter the one-time code
Type "483921" into "One-time code" and click "Verify and sign in".

## Verify the dashboard and masked accounts
Verify the dashboard greets Priya and the accounts card shows "Total Checking ••••8841" at "$4,210.55", "Premier Savings ••••2290" at "$18,740.12" and "Chaise Sapphire Card ••••9921" at "$-1,284.37".
