---
mode: testing
url: https://my-testing-repo-main.vercel.app/zerodha/gtt-trigger?reset=true
max_steps: 40
tags: [zerodha, consumer-fintech, custom]
---

# Zerodhi 17.2: GTT trigger creation

Catalog objective: create a GTT with trigger and limit price.
Key assertion: the GTT is listed active with the correct values.

## Open GTT
Go to https://my-testing-repo-main.vercel.app/zerodha/gtt-trigger?reset=true and verify the "Create GTT" form with instrument "RELX · LTP 2912.50" and an empty GTT list.

## Trigger above LTP
Type "2950" into Trigger price and "2955" into Limit price, click "Place GTT", and verify the error "For a BUY GTT the trigger must be below the LTP (2912.50)."

## Valid trigger
Change Trigger price to 2850 and Limit price to 2855, click "Place GTT", and verify a new row appears in the GTT list.

## Verify the GTT values
Verify the row shows ID "GTT1044", instrument "RELX", type "Single · BUY", trigger "2850.00", limit "2855.00", qty "2" and status "Active".
