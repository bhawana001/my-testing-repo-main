---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/signup-plan?reset=true
max_steps: 45
tags: [netflix, streaming, checkout]
---

# Netflixy 47.1: Signup with plan selection

Catalog objective: sign up choosing the Standard plan with a test card.
Key assertion: the account is active with the correct plan.

## Choose Standard
Go to https://my-testing-repo-main.vercel.app/netflix/signup-plan?reset=true, keep "Standard" ($15.49/mo) selected, click "Next", and verify the "Create a password" step.

## Short password
Type "demo@evals.dev" into Email and "short" into Password, click "Next", and verify "Password must be at least 8 characters."

## Valid account
Change Password to "Demo123!", click "Next", and verify the payment step shows "Standard · $15.49/month".

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Start Membership", and verify "Membership active".

## Verify the plan
Verify "Your plan" reads "Standard" and "Price" reads "$15.49/month".
