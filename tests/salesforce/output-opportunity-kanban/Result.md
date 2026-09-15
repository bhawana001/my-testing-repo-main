---
test: ../opportunity-kanban_test.md
status: passed
started: 2026-09-13T12:58:17.504Z
duration_s: 110
session_id: 75781c95-6f51-4e61-93e5-2c69220dd85b
---

# Salesforze 28.2: Opportunity stage move — Result

## Open the kanban ✓ passed (24.2s)
md5: 9f112ca0a61df05dc8e6046587f482cc
Go to https://my-testing-repo-main.vercel.app/salesforce/opportunity-kanban?reset=true and verify the card "Globex · 200 seats" sits in the Qualification column with probability "20%".

## Drag to the next stage ✓ passed (48.2s)
md5: 7a6280168cbab289e3d1878ba37617d1
Drag the "Globex · 200 seats" card into the "Proposal" column.

## Verify stage and probability ✓ passed (35.6s)
md5: 3c8230c2b29b3f2290f297f974da117a
Verify the message "Globex · 200 seats moved from Qualification to Proposal. Probability is now 50%.", the card now sits in the Proposal column showing "50%", and the Proposal column count reads 2.
