---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce-clone-app/reports?reset=true
max_steps: 40
tags: [salesforce, crm, reporting]
---

# Salesfource 28.3: Report filter

Catalog objective: run a pipeline report filtered to this quarter.
Key assertion: the report renders rows matching the filter.

## Set the filter
Select "Q4" in "Close quarter", leave "Opportunity owner" on All and "Stage" on All.

## Run the report
Click "Run Report" and verify a "Report results" card appears.

## Verify the rows match the filter
Verify the summary reads "3 records · filtered to quarter Q4" and the rows are "Northwind — Platform Licence", "Brightline — Renewal" and "Harbour — Pilot", with "Cedar Foods — Expansion" excluded because it closes in Q1.

## Verify the total
Verify "Total amount" reads "$80,300.00".
