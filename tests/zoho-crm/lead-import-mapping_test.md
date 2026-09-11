---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-crm/lead-import-mapping?reset=true
max_steps: 40
tags: [zoho-crm, crm, wizard]
---

# Zohoo CRM 32.1: Lead import mapping

Catalog objective: import a small CSV of leads with field mapping.
Key assertion: leads are created with the mapped fields.

## Load the CSV
Go to https://my-testing-repo-main.vercel.app/zoho-crm/lead-import-mapping?reset=true, click "Load sample leads.csv", and verify "3 rows · columns: Full Name, E-mail, Org, Phone".

## Map fields with a missing mandatory field
Click "Next", verify the mapping step shows Full Name → Last Name, E-mail → Email, Org → "— Do not import —", Phone → Phone, then click "Next" and verify "Map the mandatory fields: Last Name and Company."

## Fix the mapping
Select "Company" for the Org column, click "Next", and verify the preview lists Priya Raman, Jon Park and Lena Ortiz with companies Nimbus Labs, Vertex AI and Quanta Foods.

## Import
Click "Import 3 leads" and verify "3 leads imported successfully. 0 skipped."

## Verify the created leads
Verify the Leads table shows LD-5001 "Priya Raman" (priya@nimbus.test, Nimbus Labs, 555-0101), LD-5002 "Jon Park" and LD-5003 "Lena Ortiz", each with source "Import".
