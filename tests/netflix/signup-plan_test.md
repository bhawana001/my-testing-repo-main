---
mode: testing
url: https://my-testing-repo-main.vercel.app/stream-clone-app/signup?reset=true
max_steps: 45
tags: [netflix, streaming, subscription]
---

# StreamFlix 47.1: Signup with a plan

Catalog objective: sign up choosing the standard plan with a test card.
Key assertion: the account is active on the correct plan.

## Choose the plan
Choose "Standard — $15.49/month" and verify its detail reads "1080p · 2 screens · 2 download devices".

## Enter the account details
Type "priya@example.test" into "Email" and verify "Selected plan" reads "Standard · $15.49/mo".

## Pay with the test card
Type "4242 4242 4242 4242" into "Card number" and click "Start membership".

## Verify the membership is active on that plan
Verify a green banner titled "Membership active" names the "Standard" plan, and the summary shows "Plan" of "Standard", "Monthly price" of "$15.49", "Video quality" of "1080p" and "Screens at once" of "2".
