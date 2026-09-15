---
test: ../lead-import-mapping_test.md
status: passed
started: 2026-09-13T13:32:40.048Z
duration_s: 184
session_id: db26cb55-fc5b-41ca-b6fe-eb18c10a5fb1
---

# Zohoo CRM 32.1: Lead import mapping — Result

## Load the CSV ✓ passed (31.9s)
md5: 8ace2a932c2db3519fccc891715be70e
Go to https://my-testing-repo-main.vercel.app/zoho-crm/lead-import-mapping?reset=true, click "Load sample leads.csv", and verify "3 rows · columns: Full Name, E-mail, Org, Phone".

## Open the mapping step ✓ passed (31.2s)
md5: f63895f39243a0250ab3ce87ea601293
Click "Next" and verify the mapping step shows Full Name → Last Name, E-mail → Email, Org → "— Do not import —", Phone → Phone.

## Try to continue with a missing mandatory field ✓ passed (30.3s)
md5: 45cc486be0e08a37c2e80c81844ca243
Click "Next" and verify "Map the mandatory fields: Last Name and Company."

## Fix the mapping ✓ passed (26.2s)
md5: b1c9ef1fcf91e3679a182ca6f1d81c41
Select "Company" for the Org column, click "Next", and verify the preview lists Priya Raman, Jon Park and Lena Ortiz with companies Nimbus Labs, Vertex AI and Quanta Foods.

## Import ✓ passed (31.8s)
md5: a738421406bbe496fc7a0a9e36261079
Click "Import 3 leads" and verify "3 leads imported successfully. 0 skipped."

## Verify the created leads ✓ passed (30.4s)
md5: b2223aaa4b4d3cb067abb5630c5e5c8b
Verify the Leads table shows LD-5001 "Priya Raman" (priya@nimbus.test, Nimbus Labs, 555-0101), LD-5002 "Jon Park" and LD-5003 "Lena Ortiz", each with source "Import".
