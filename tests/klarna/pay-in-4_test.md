---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna-clone-app/checkout?reset=true
max_steps: 45
tags: [klarna, payments, bnpl]
---

# Klarnah 14.1: Pay in 4

Catalog objective: choose Klarnah at checkout and complete the pay-in-4 signup.
Key assertion: the instalment schedule is shown before confirming.

## Choose Klarnah
Verify the page subtitle reads "Studio Lamps · $180.00" and "Pay in 4 with Klarnah" is selected.

## Complete the quick check
Type "Priya Nair" into "Full name", type "4417" into "Last 4 of ID number", set "Date of birth" to "1992-04-18", and click "Continue with Klarnah".

## Verify the schedule appears before you confirm
Verify a badge reads "Approved — 4 interest-free payments" and the schedule table shows four payments of "$45.00" due "2026-09-15", "2026-09-29", "2026-10-13" and "2026-10-27", with "Total" of "$180.00" and "Interest" of "$0.00".

## Confirm the order
Click "Confirm and pay $45.00 today" and verify a green banner titled "Order placed" names order "KL-3301".
