---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-crm/dashboard-kpi?reset=true
max_steps: 40
tags: [zoho-crm, crm, crud]
---

# Zohoo CRM 32.4: Dashboard KPI render

Catalog objective: open a dashboard and verify the KPI cards match report values.
Key assertion: numbers are consistent across widgets.

## Open the dashboard
Go to https://my-testing-repo-main.vercel.app/zoho-crm/dashboard-kpi?reset=true and verify "Sep 2026" is selected and KPI cards show Revenue won "$70,000.00", Deals won "2", Open pipeline "$96,500.00" and Win rate "100%".

## Compare with the report
Verify the report "Deals by stage · Sep 2026" shows "Sum of Closed Won amounts" "$70,000.00" and "Sum of open deal amounts" "$96,500.00", matching the KPI cards.

## Switch period and re-compare
Click "Aug 2026" and verify Revenue won reads "$68,500.00" and the report's "Sum of Closed Won amounts" also reads "$68,500.00".
