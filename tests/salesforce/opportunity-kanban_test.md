---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/opportunity-kanban?reset=true
max_steps: 40
tags: [salesforce, crm, crud]
---

# Salesforze 28.2: Opportunity stage move

Catalog objective: drag an opportunity to the next stage in the kanban.
Key assertion: the stage is updated and the probability changes.

## Open the kanban
Go to https://my-testing-repo-main.vercel.app/salesforce/opportunity-kanban?reset=true and verify the card "Globex · 200 seats" sits in the Qualification column with probability "20%".

## Drag to the next stage
Drag the "Globex · 200 seats" card into the "Proposal" column.

## Verify stage and probability
Verify the message "Globex · 200 seats moved from Qualification to Proposal. Probability is now 50%.", the card now sits in the Proposal column showing "50%", and the Proposal column count reads 2.
