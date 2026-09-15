---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase-clone-app/send?reset=true
max_steps: 45
tags: [coinbase, fintech, crypto]
---

# Coinbaze 18.3: Send to address

Catalog objective: initiate a send and verify address validation and warning states.
Key assertion: an invalid address is blocked before confirming.

## Verify a malformed address is rejected
With "ETH" selected, type "not-an-address" into "Recipient address" and verify a red badge reads "Not a valid ETH address — 0x followed by 40 hex characters" and the send button is disabled.

## Verify the wrong-network warning
Select "BTC" in "Asset", type "0x8Ba1f109551bD432803012645Ac136ddd64DBA72" into "Recipient address", and verify a red banner titled "Wrong network" says that looks like an ETH address and sending BTC to it would lose the funds.

## Verify a valid address is accepted
Select "ETH" in "Asset", keep the address "0x8Ba1f109551bD432803012645Ac136ddd64DBA72", and verify a green badge reads "Valid ETH address" with the send button now enabled.

## Complete the send
Type "0.1" into "Amount in ETH", tick "I understand this transfer is irreversible", click "Send ETH", and verify a green banner titled "Send submitted" says "0.1 ETH" was sent.
