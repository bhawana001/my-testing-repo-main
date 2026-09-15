---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce-clone-app/opportunities?reset=true
max_steps: 40
tags: [salesforce, crm, pipeline]
---

# Salesfource 28.2: Opportunity kanban

Catalog objective: move an opportunity to the next stage on the kanban board.
Key assertion: the stage updates and the probability changes with it.

## Verify where the opportunity starts
Verify the "Qualification · 25%" column holds "Northwind — Platform Licence" at "$48,000.00" with a badge reading "25% probability".

## Move it to the next stage
Click "Move to Proposal" on the "Northwind — Platform Licence" card.

## Verify the stage changed
Verify the card now sits in the "Proposal · 50%" column.

## Verify the probability changed with it
Verify the card's badge now reads "50% probability" and its amount is still "$48,000.00".
