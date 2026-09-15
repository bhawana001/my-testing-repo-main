---
mode: testing
url: https://my-testing-repo-main.vercel.app/square-clone-app/dashboard?reset=true
max_steps: 45
tags: [square, payments, refunds]
---

# Squair 12.4: Refund from the dashboard

Catalog objective: refund the latest payment partially from the dashboard.
Key assertion: the refund is recorded and the balance updates.

## Verify the starting balance
Verify "Net sales after refunds" reads "$250.00" and the "pay_8812" row shows a refunded amount of "$0.00" with a "Completed" badge.

## Open the refund dialog
Click the refund button on the "pay_8812" row and verify a dialog titled "Refund pay_8812" opens showing "Original amount" of "$250.00".

## Refund part of it
Type "60" into "Refund amount", click "Issue refund", and verify a green banner reads "Refunded $60.00 on pay_8812."

## Verify the refund and the balance
Verify the "pay_8812" row now shows refunded of "$60.00", a net of "$190.00" and a "Partially refunded" badge, and "Net sales after refunds" reads "$190.00".
