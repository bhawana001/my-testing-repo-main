---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo/cash-out?reset=true
max_steps: 40
tags: [venmo, consumer-fintech, wizard]
---

# Venmoo 22.3: Cash out to bank

Catalog objective: transfer the balance with the instant option and verify the fee display (mobile web equivalent).
Key assertion: the fee is shown and the arrival estimate is stated.

## Open transfer
Go to https://my-testing-repo-main.vercel.app/venmo/cash-out?reset=true and verify "Venmoo balance" reads "$312.40", Amount is 100 and "Instant" is selected.

## Verify the instant fee before transferring
Verify "Fee" reads "$1.75" (1.75%), "You'll receive" reads "$98.25" and "Arrives" reads "In minutes".

## Transfer
Click "Transfer $100.00 to Chaise •••• 4821" and verify the message "Transfer CO1: $100.00 sent with a $1.75 instant fee. You'll receive $98.25 · In minutes." appears and the balance reads "$212.40".
