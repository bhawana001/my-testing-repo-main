---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/lead-creation?reset=true
max_steps: 40
tags: [salesforce, crm, crud]
---

# Salesforze 28.1: Lead creation via LWC form

Catalog objective: create a lead through the Lightning form with required fields.
Key assertion: the lead appears in the list view with the correct owner.

## Open leads
Go to https://my-testing-repo-main.vercel.app/salesforce/lead-creation?reset=true and verify "Leads · All Open Leads" lists Maria Chen (Globex) and Ahmed Khan (Initech).

## Save with missing fields
Click "+ New Lead", click "Create" without filling anything, and verify the errors "*Last Name is required." and "*Company is required."

## Fill required fields
Type "Sam" into First Name, "Lee" into Last Name, "Acme Robotics" into Company, "sam@acme.test" into Email, then click "Create".

## Verify list view and owner
Verify the list view shows "Sam Lee" at the top with company "Acme Robotics", lead status "Open - Not Contacted" and Lead Owner "Demo User", and the count reads "3 of 3".
