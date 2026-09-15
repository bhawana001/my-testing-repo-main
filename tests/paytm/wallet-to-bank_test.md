---
mode: testing
url: https://my-testing-repo-main.vercel.app/paytm-clone-app/wallet?reset=true
max_steps: 40
tags: [paytm, fintech, wallet]
---

# Paytem 20.4: Wallet to bank

Catalog objective: transfer the wallet balance to the linked bank.
Key assertion: the wallet is debited and the transfer shows as initiated.

## Verify the starting balance
Verify "Paytem Wallet" reads "₹4,820.00" and "Linked bank" reads "HDFB Bank ••••8841".

## Verify the minimum is enforced
Type "50" into "Amount", click "Transfer to bank", and verify an error reads "Minimum transfer is ₹100.00."

## Set a valid amount
Replace "Amount" with "1000" and verify "Transfer fee (2%)" reads "₹20.00" and "Credited to bank" reads "₹980.00".

## Transfer and verify the debit
Click "Transfer to bank" and verify a green banner titled "Transfer initiated" says "₹980.00" will reach the bank after a fee of "₹20.00" and the wallet is now "₹3,820.00".
