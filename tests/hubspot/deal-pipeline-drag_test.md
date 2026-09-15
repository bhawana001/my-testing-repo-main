---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot-clone-app/deals?reset=true
max_steps: 40
tags: [hubspot, crm, pipeline]
---

# Hubsprout 29.2: Deal pipeline drag

Catalog objective: move a deal across pipeline stages.
Key assertion: the deal stage changes and the amount is preserved.

## Verify where the deal starts
Verify the "Northgate Supply — annual" card sits in the "Qualified to buy" column showing "$24,000.00", and the page subtitle reads "2 deals · $31,500.00".

## Move the deal
On the "Northgate Supply — annual" card, select "Presentation scheduled" in its "Stage for Northgate Supply — annual" dropdown, and verify a green banner reads "Northgate Supply — annual moved to Presentation scheduled. Amount still $24,000.00."

## Verify the stage changed
Verify the "Presentation scheduled — $24,000.00" column now holds the "Northgate Supply — annual" card and the "Qualified to buy — $0.00" column is empty.

## Verify the amount was preserved
Verify the deal record still shows "$24,000.00", the total pipeline still reads "$31,500.00", and the deal history contains "Stage Qualified to buy → Presentation scheduled, amount unchanged at $24,000.00".
