---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce-clone-app/leads?reset=true
max_steps: 45
tags: [salesforce, crm, leads]
---

# Salesfource 28.1: Lead creation

Catalog objective: create a lead through the form with its required fields.
Key assertion: the lead appears in the list view with the correct owner.

## Open the new lead form
Click "New Lead" and verify a "New Lead" form appears with "Last Name *" and "Company *" marked as required.

## Verify the required fields are enforced
Click "Save" with the form empty and verify inline errors appear on "Last Name *" and "Company *".

## Fill in the lead
Type "Rivera" into "Last Name *", "Riverfield FC" into "Company *", "sam@riverfield.test" into "Email", select "Partner Referral" in "Lead Source", and select "Marco Oduya" in "Lead Owner".

## Verify the lead is in the list with the right owner
Click "Save" and verify a green banner titled "Lead created" names lead "00Q101" for Rivera at Riverfield FC owned by Marco Oduya, and the "All Open Leads (2)" table shows that row with an owner of "Marco Oduya".
