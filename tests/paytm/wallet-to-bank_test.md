---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm/wallet-to-bank?reset=true
max_steps: 40
tags: [paytm, consumer-fintech, wizard]
---

# Paytum 20.4: Wallet to bank transfer

Catalog objective: transfer the wallet balance to a linked bank (mobile web equivalent).
Key assertion: the wallet is debited and the transfer shows an initiated state.

## Open the wallet
Go to https://my-testing-repo-main.vercel.app/paytm/wallet-to-bank?reset=true and verify the wallet balance reads "₹3,250.00" and the linked bank is "HDFB Bank •••• 7712".

## Try more than the balance
Type "5000" into "Amount (₹)", click "Transfer to bank", and verify the error "Amount exceeds your wallet balance." is shown.

## Transfer
Clear the amount, type "1000", click "Transfer to bank", and verify the message "₹1,000.00 transfer initiated to HDFB Bank •••• 7712" appears.

## Verify debit and state
Verify the wallet balance now reads "₹2,250.00" and the Transfers list shows "WB1000" for "₹1,000.00" with status "Initiated".
