---
test: ../login-2fa_test.md
status: passed
started: 2026-09-11T11:14:36.891Z
duration_s: 201
session_id: a8fd9ff7-572d-4e86-8424-14a745ce560e
---

# Chaise Bank 23.1: Login with 2FA — Result

## Open the sign-in page ✓ passed (23.8s)
md5: f9db77f8570e4a75203590a0e5e44b46
Go to https://my-testing-repo-main.vercel.app/chase/login-2fa?reset=true and verify the heading "Sign in to Chaise Online" is visible with Email and Password fields.

## Try a wrong password ✓ passed (43.2s)
md5: f4e3788f1fb1ff0dce8039b445bbcc90
Type {{demo_email}} into the Email field and "wrongpass" into the Password field, click "Continue", and verify an error message containing "Incorrect email or password" is shown.

## Sign in with the correct password ✓ passed (56.3s)
md5: 3800be8c7c7b4b424b5788ee7be8fbad
Clear the Password field, type {{demo_password}}, click "Continue", and verify the heading "Verify it's you" with a "Verification code" field is shown.

## Enter the one-time code ✓ passed (36.9s)
md5: 47e27a3ea428edf9139c6c14567e03ea
Type {{otp}} into the Verification code field and click "Verify and continue".

## Verify the dashboard ✓ passed (36.4s)
md5: af89580bdcd7f237bdf51097427009b2
Verify the heading "Welcome back, Demo" is visible, the text "Signed in as Demo User" is shown, and three account cards are listed with masked numbers "•••• 4821", "•••• 9930" and "•••• 1177" (no full account numbers are displayed).
