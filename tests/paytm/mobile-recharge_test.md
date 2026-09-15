---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm-clone-app/recharge?reset=true
max_steps: 40
tags: [paytm, fintech, recharge]
---

# Paytem 20.2: Mobile recharge

Catalog objective: recharge a prepaid number, choosing a plan.
Key assertion: the plan amount is charged and a receipt is shown.

## Enter the number and operator
Type "9876543210" into "Mobile number" and select "Jiofy" in "Operator".

## Choose a plan
Choose the "₹299.00 · 2 GB/day" plan and verify "Selected plan" reads "₹299.00 · 28 days".

## Recharge
Click the recharge button and verify a green banner titled "Recharge successful" says "9876543210" was recharged with the "₹299.00" plan.

## Verify the receipt
Verify the receipt shows "Transaction ID" of "PTM9095900", "Operator" of "Jiofy", "Plan" of "₹299.00 · 2 GB/day · 28 days" and "Benefits" of "Unlimited calls + 100 SMS/day".
