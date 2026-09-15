---
test: ../signup-plan_test.md
status: passed
started: 2026-09-13T10:03:28.415Z
duration_s: 183
session_id: 7bb6c085-350a-44a9-abfe-ca3df4e53a32
---

# Netflixy 47.1: Signup with plan selection — Result

## Choose Standard ✓ passed (35.2s)
md5: 564fd8b326d0d31edd15c37c50285c8b
Go to https://my-testing-repo-main.vercel.app/netflix/signup-plan?reset=true, keep "Standard" ($15.49/mo) selected, click "Next", and verify the "Create a password" step.

## Short password ✓ passed (36.9s)
md5: b8c972b440431ac211c1f6739db2e85c
Type "demo@evals.dev" into Email and "short" into Password, click "Next", and verify "Password must be at least 8 characters."

## Valid account ✓ passed (35.9s)
md5: 47bac436c29e0031001743c0b801ac3f
Change Password to "Demo123!", click "Next", and verify the payment step shows "Standard · $15.49/month".

## Pay ✓ passed (42.5s)
md5: bf3ae47bae2b26cf5a23d2548cab9376
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Start Membership", and verify "Membership active".

## Verify the plan ✓ passed (30.5s)
md5: 23515d9975a3f37efc555ffb7bed86a4
Verify "Your plan" reads "Standard" and "Price" reads "$15.49/month".
