---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/deal-pipeline-drag?reset=true
max_steps: 40
tags: [hubspot, crm, crud]
---

# HubSpotty 29.2: Deal pipeline drag

Catalog objective: move a deal across pipeline stages.
Key assertion: the deal stage changes and the amount is preserved.

## Open the pipeline
Go to https://my-testing-repo-main.vercel.app/hubspot/deal-pipeline-drag?reset=true and verify "Globex · Marketing Hub" (Amount: $18,000.00) is in the "Qualified to buy" column.

## Drag to the next stage
Drag the "Globex · Marketing Hub" card into the "Presentation scheduled" column and verify the message "Globex · Marketing Hub moved from “Qualified to buy” to “Presentation scheduled”. Amount $18,000.00 unchanged."

## Verify after reload
Reload the page without the reset parameter and verify the card is still in "Presentation scheduled" with "Amount: $18,000.00".
