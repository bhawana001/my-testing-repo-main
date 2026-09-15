---
test: ../dashboard-kpi_test.md
status: passed
started: 2026-09-13T13:40:12.128Z
duration_s: 111
session_id: 7508f06a-e056-4030-bc95-88463129e8bd
---

# Zohoo CRM 32.4: Dashboard KPI render — Result

## Open the dashboard ✓ passed (21.1s)
md5: 860ba41a3ba1d182a805ddabbf4db2ad
Go to https://my-testing-repo-main.vercel.app/zoho-crm/dashboard-kpi?reset=true and verify "Sep 2026" is selected and KPI cards show Revenue won "$70,000.00", Deals won "2", Open pipeline "$96,500.00" and Win rate "100%".

## Compare with the report ✓ passed (39.3s)
md5: aff759e3732a7e184d240e4145ac7b5c
Verify the report "Deals by stage · Sep 2026" shows "Sum of Closed Won amounts" "$70,000.00" and "Sum of open deal amounts" "$96,500.00", matching the KPI cards.

## Switch period and re-compare ✓ passed (48.5s)
md5: 9977307410a2a500369434b9abc9a09a
Click "Aug 2026" and verify Revenue won reads "$68,500.00" and the report's "Sum of Closed Won amounts" also reads "$68,500.00".
