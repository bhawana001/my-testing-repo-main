---
mode: testing
url: https://my-testing-repo-main.vercel.app/robinhood-clone-app/options?reset=true
max_steps: 40
tags: [robinhood, fintech, options]
---

# Robinhud 16.5: Options chain

Catalog objective: open an options chain and select an expiry and a strike.
Key assertion: the premium renders for the selection.

## Choose the underlying and expiry
Select "AAPL" in "Underlying" and "2026-09-26" in "Expiry", then verify "AAPL last" reads "$226.80".

## Verify the chain
Verify the calls table for 2026-09-26 lists strikes 215, 220, 225, 230 and 235, with 215 marked "ITM" and 230 marked "OTM".

## Select a strike
Click "Select" on the 230 strike and verify a "Selected contract" card appears.

## Verify the premium for the selection
Verify the contract reads "AAPL 2026-09-26 $230.00 Call" with "Bid / Ask" of "$3.25 / $3.35" and "Cost for 1 contract (100 shares)" of "$335.00".
