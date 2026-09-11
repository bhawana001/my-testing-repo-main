---
mode: testing
url: https://my-testing-repo-main.vercel.app/coinbase/send-to-address?reset=true
max_steps: 40
tags: [coinbase, consumer-fintech, wizard]
---

# Coinbayse 18.3: Send to address flow

Catalog objective: initiate a send and verify address validation and warning states.
Key assertion: an invalid address is blocked before confirm.

## Invalid address
Go to https://my-testing-repo-main.vercel.app/coinbase/send-to-address?reset=true, type "0x123" into "To (address)" and "0.1" into Amount, click "Check address", and verify the error "Invalid Ethereum address. It must start with 0x followed by 40 hex characters." and that "Continue" is disabled.

## Wrong-network address
Replace the address with "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", click "Check address", and verify the error "This looks like a Bitcoin address. Sending ETH to it would lose your funds." with "Continue" still disabled.

## New address warning
Replace the address with "0x52908400098527886E0F7030069857D2E4169EE7", click "Check address", and verify the warning "You've never sent to this address before." and a confirmation checkbox, with "Continue" disabled until it is checked.

## Acknowledge and review
Check "I've checked the address and understand sends can't be reversed", click "Continue", and verify a "Send now" button with "Network fee 0.00042 ETH" is shown.
