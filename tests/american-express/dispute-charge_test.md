---
mode: testing
url: https://my-testing-repo-main.vercel.app/amex-clone-app/disputes?reset=true
max_steps: 45
tags: [american-express, banking, disputes]
---

# Amrex 25.3: Dispute a charge

Catalog objective: start a dispute on a recent charge.
Key assertion: a case is opened with a confirmation.

## Pick the charge
Select the "2026-09-02 — Skyline Airlines — $642.10" charge and verify "Amount" reads "$642.10".

## Give a reason
Choose "I did not receive the goods or services" and type "The flight was cancelled and never rebooked or refunded." into "What happened".

## Open the dispute
Click "Open the dispute" and verify a green card titled "Case opened" appears.

## Verify the case details
Verify the case shows "Case number" of "AMX-58210", "Merchant" of "Skyline Airlines", "Amount" of "$642.10", "Reason" of "I did not receive the goods or services", "Decision by" of "2026-10-16" and a badge reading "Under review".
