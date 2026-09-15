---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise-clone-app/transfers?reset=true
max_steps: 40
tags: [wise, payments, tracking]
---

# Wize 15.3: Transfer tracking

Catalog objective: open an in-flight transfer and check its status steps.
Key assertion: the timeline shows the current step accurately.

## Open the in-flight transfer
Click "Track" on the "TR-80114" row and verify the page title reads "Transfer TR-80114" with the subtitle "To Mira Shah".

## Verify the amounts
Verify "You sent" reads "$500.00", "They receive" reads "₹41,481.29", "Fee" reads "$2.86" and "Estimated arrival" reads "by Wednesday, 17 September".

## Verify the current step
Verify the timeline lists "You set up the transfer", "We received your money", "We paid out your money" and "Money delivered", with a badge reading "Current step: We received your money".

## Advance the transfer
Click "Simulate next step" and verify the badge now reads "Current step: We paid out your money".
