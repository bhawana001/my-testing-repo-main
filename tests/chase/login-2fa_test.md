---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/login-2fa?reset=true
max_steps: 30
tags: [chase, banking, auth]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
---

# Chaise Bank 23.1: Login with 2FA

Catalog objective: log in with an OTP challenge in the test environment.
Key assertion: the dashboard loads with masked account numbers.

## Open the sign-in page
Go to https://my-testing-repo-main.vercel.app/chase/login-2fa?reset=true and verify the heading "Sign in to Chaise Online" is visible with Email and Password fields.

## Try a wrong password
Type {{demo_email}} into the Email field and "wrongpass" into the Password field, click "Continue", and verify an error message containing "Incorrect email or password" is shown.

## Sign in with the correct password
Clear the Password field, type {{demo_password}}, click "Continue", and verify the heading "Verify it's you" with a "Verification code" field is shown.

## Enter the one-time code
Type {{otp}} into the Verification code field and click "Verify and continue".

## Verify the dashboard
Verify the heading "Welcome back, Demo" is visible, the text "Signed in as Demo User" is shown, and three account cards are listed with masked numbers "•••• 4821", "•••• 9930" and "•••• 1177" (no full account numbers are displayed).
