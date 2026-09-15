---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-clone-app/dashboard?reset=true
max_steps: 40
tags: [zoho-crm, crm, reporting]
---

# Zohoe CRM 32.4: Dashboard KPI render

Catalog objective: open a dashboard and verify the KPI cards match the report values.
Key assertion: the numbers are consistent across the widgets.

## Verify the KPI tiles
Verify the tiles read "Total leads" of 1, "Pipeline value" of "$24,000.00", "Hot leads" of 0, "Unassigned" of 1, "Average deal" of "$24,000.00" and "Closed won" of 0.

## Verify the stage report
Verify the "Leads by stage" card shows "Qualification" of 1 and "Closed won" of 0.

## Verify the underlying report table agrees
Verify the report table rows read "Total leads" 1, "Pipeline value" "$24,000.00", "Hot leads" 0, "Unassigned" 1, "Average deal" "$24,000.00" and "Closed won" 0.

## Verify the consistency note
Verify a badge reads "Cards and report share one calculation".
