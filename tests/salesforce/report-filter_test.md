---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/report-filter?reset=true
max_steps: 40
tags: [salesforce, crm, crud]
---

# Salesforze 28.3: Report run and filter

Catalog objective: run a pipeline report filtered to this quarter.
Key assertion: the report renders rows matching the filter.

## Open the report
Go to https://my-testing-repo-main.vercel.app/salesforce/report-filter?reset=true and verify "Pipeline by Close Date" with the text "Set filters and click Run Report."

## Filter and run
Select "Current FQ (Jul 1 – Sep 30, 2026)" for Close Date, click "Run Report", and verify "Report results · 3 records" with the badge "Close Date: Current FQ".

## Verify the rows
Verify the rows are "Globex · 200 seats" (2026-09-22), "Initech · Renewal" (2026-08-30) and "Hooli · Expansion" (2026-07-18), all dated between July 1 and September 30, 2026, and "Grand Total (3)" reads "$131,000.00".
