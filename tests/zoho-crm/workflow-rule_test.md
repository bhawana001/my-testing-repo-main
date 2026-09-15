---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-clone-app/workflows?reset=true
max_steps: 45
tags: [zoho-crm, crm, automation]
---

# Zohoe CRM 32.2: Workflow rule trigger

Catalog objective: create a record that triggers a field update workflow.
Key assertion: the field is auto-updated according to the rule.

## Verify the rules are active
Verify the "Active rules" card lists "Flag high value leads" (when Deal Amount is 50,000 or more, set Rating to "Hot") and "Route web leads" (when Lead Source is Web, set owner to "Priya Nair").

## Create a record that matches both rules
Leave "First name" as "Dana", "Last name" as "Ellery", "Company" as "Summit Royals", "Lead source" as "Web" and "Deal amount" as "62000".

## Save it
Click "Save the lead" and verify a green banner reads "2 rules fired: Flag high value leads, Route web leads."

## Verify the fields were auto-updated
Verify the saved record shows "Lead id" of "L2", "Deal Amount" of "$62,000.00", "Rating" of "Hot" and "Owner" of "Priya Nair", and the record log contains "Workflow “Flag high value leads” set rating to Hot".
