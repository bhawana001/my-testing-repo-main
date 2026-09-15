---
test: ../send-to-address_test.md
status: passed
started: 2026-09-13T12:01:51.285Z
duration_s: 170
session_id: d78a4ba9-80b1-4741-82cd-f71463790844
---

# Coinbayse 18.3: Send to address flow — Result

## Invalid address ✓ passed (52.9s)
md5: 7ecfee3e538f7adb0626e520d6dd9012
Go to https://my-testing-repo-main.vercel.app/coinbase/send-to-address?reset=true, type "0x123" into "To (address)" and "0.1" into Amount, click "Check address", and verify the error "Invalid Ethereum address. It must start with 0x followed by 40 hex characters." and that "Continue" is disabled.

## Wrong-network address ✓ passed (35.8s)
md5: 64ecfc14391f2026ae8e0fe1fa172bea
Replace the address with "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", click "Check address", and verify the error "This looks like a Bitcoin address. Sending ETH to it would lose your funds." with "Continue" still disabled.

## New address warning ✓ passed (31.6s)
md5: 69902586ad83c8d4fb5e578816844bcc
Replace the address with "0x52908400098527886E0F7030069857D2E4169EE7", click "Check address", and verify the warning "You've never sent to this address before." and a confirmation checkbox, with "Continue" disabled until it is checked.

## Acknowledge and review ✓ passed (47.6s)
md5: a0180da51bf16430d948271cbe45dd68
Check "I've checked the address and understand sends can't be reversed", click "Continue", and verify a "Send now" button with "Network fee 0.00042 ETH" is shown.
