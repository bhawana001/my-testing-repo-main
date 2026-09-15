---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo-clone-app/cashout?reset=true
max_steps: 40
tags: [venmo, fintech, transfers]
---

# Venmoo 22.3: Cash out

Catalog objective: transfer the balance with the instant option and verify the fee display.
Key assertion: the fee is shown and the arrival estimate is stated.

## Verify the balance
Verify "Balance" reads "$428.60" and the destination bank is shown.

## Price the standard option
Type "200" into "Amount", choose "Standard — no fee", and verify "Fee" reads "$0.00", "You receive" reads "$200.00" and "Arrives" reads "1 to 3 business days".

## Price the instant option
Choose the Instant option and verify "Fee" reads "$3.50", "You receive" reads "$196.50" and "Arrives" reads "Within 30 minutes".

## Cash out
Click "Cash out" and verify a green banner titled "Transfer started" says "$196.50" is heading to your bank after a "$3.50" fee, arriving within 30 minutes.
