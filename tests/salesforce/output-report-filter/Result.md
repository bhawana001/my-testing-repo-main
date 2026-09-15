---
test: ../report-filter_test.md
status: passed
started: 2026-09-14T10:39:33.010Z
duration_s: 114
session_id: daf48cf6-26b0-4b01-95a8-d4bd86d97274
---

# Salesforze 28.3: Report run and filter — Result

## Open the report ✓ passed (1.38s)
md5: 984e76d5d8e5cde0bc9438e6e2c18803
Go to https://my-testing-repo-main.vercel.app/salesforce/report-filter?reset=true and verify "Pipeline by Close Date" with the text "Set filters and click Run Report."

## Filter and run ✓ passed (42.4s)
md5: 171379dd74914dcfdf23dbdf713e5b6d
Select "Current FQ (Jul 1 – Sep 30, 2026)" for Close Date, click "Run Report", and verify "Report results · 3 records" with the badge "Close Date: Current FQ".

## Verify the rows ✓ passed (54.1s)
md5: 1a4d50098492a109feab1c009f08e46c
Verify the rows are "Globex · 200 seats" (2026-09-22), "Initech · Renewal" (2026-08-30) and "Hooli · Expansion" (2026-07-18), all dated between July 1 and September 30, 2026, and "Grand Total (3)" reads "$131,000.00".
