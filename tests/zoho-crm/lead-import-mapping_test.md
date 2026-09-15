---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-clone-app/import?reset=true
max_steps: 45
tags: [zoho-crm, crm, import]
---

# Zohoe CRM 32.1: Lead import mapping

Catalog objective: import a small CSV of leads with field mapping.
Key assertion: the leads are created with the mapped fields.

## Read the file
Click "Read the file" and verify a "Map the columns" card appears with "Rows found" of 3.

## Verify the mapping
Verify the mapping table maps "Given Name" to "First Name", "Surname" to "Last Name", "Organisation" to "Company", "Work Email" to "Email", "Channel" to "Lead Source" and "Value" to "Deal Amount".

## Run the import
Click "Import 3 leads" and verify a green banner titled "Import complete" reads "3 leads created."

## Verify the mapped values landed on the record
Verify the "First imported record" card shows "Lead id" of "L2", "First Name" of "Sam", "Last Name" of "Rivera", "Company" of "Riverfield FC", "Email" of "sam@riverfield.test", "Lead Source" of "Web" and "Deal Amount" of "52000".
