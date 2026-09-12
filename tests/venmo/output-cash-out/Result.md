---
test: ../cash-out_test.md
status: passed
started: 2026-09-12T13:35:20.693Z
duration_s: 1894
session_id: 9cae75fd-46bf-4428-a864-5ff3a14241c1
---

# Venmoo 22.3: Cash out to bank — Result

## Open transfer ✓ passed (67.3s)
md5: 2c556ed10aa9b89d235712c8ae03a6f1
Go to https://my-testing-repo-main.vercel.app/venmo/cash-out?reset=true and verify "Venmoo balance" reads "$312.40", Amount is 100 and "Instant" is selected.

## Verify the instant fee before transferring ✓ passed (147.6s)
md5: 44e8d9c3215064be52f1ab80887fc23c
Verify "Fee" reads "$1.75" (1.75%), "You'll receive" reads "$98.25" and "Arrives" reads "In minutes".

## Transfer ✓ passed (40.5s)
md5: 100f41fcfc91dd54f2fa5622e12b5c96
Click "Transfer $100.00 to Chaise •••• 4821" and verify the message "Transfer CO1: $100.00 sent with a $1.75 instant fee. You'll receive $98.25 · In minutes." appears and the balance reads "$212.40".
