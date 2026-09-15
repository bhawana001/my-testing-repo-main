---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha-clone-app/gtt?reset=true
max_steps: 45
tags: [zerodha, fintech, orders]
---

# Zerodhaa Kyte 17.2: GTT trigger

Catalog objective: create a GTT with a trigger and a limit price.
Key assertion: the GTT is listed as active with the correct values.

## Verify the last traded price
With "RELIANCE" selected and "BUY" chosen, verify "Last traded price" reads "₹1,530.40".

## Verify a trigger on the wrong side is refused
Type "1600" into "Trigger price", "1605" into "Limit price", "5" into "Quantity", click "Create GTT", and verify an error says that for a buy GTT the trigger must be below the LTP of ₹1,530.40.

## Create a valid GTT
Replace "Trigger price" with "1450" and "Limit price" with "1455", then click "Create GTT".

## Verify the GTT is active with the right values
Verify a green banner titled "GTT created" names "GTT-1" as BUY 5 RELIANCE when the price hits "₹1,450.00" with a limit of "₹1,455.00", and the active GTT list shows that row with an "Active" badge.
