---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/incident-creation?reset=true
max_steps: 45
tags: [servicenow, itsm, crud]
---

# ServiceNowly 34.1: Incident creation

Catalog objective: create an incident with category and priority.
Key assertion: an incident number is generated and assigned.

## Open a new incident
Go to https://my-testing-repo-main.vercel.app/servicenow/incident-creation?reset=true, click "New", then click "Submit" with empty fields and verify "Category and Short description are mandatory."

## Fill the incident
Select "Software" for Category, "1 - High" for Impact and "2 - Medium" for Urgency, and verify "Calculated priority" reads "2 - High".

## Submit
Type "Email client crashes on launch" into Short description, click "Submit", and verify "Incident INC0010042 created and assigned to Application Support."

## Verify the list
Verify the incident list's first row reads "INC0010042", "Email client crashes on launch", "Software", "2 - High", "Application Support", state "New".
