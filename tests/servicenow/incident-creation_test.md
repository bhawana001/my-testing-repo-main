---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow-clone-app/incidents?reset=true
max_steps: 45
tags: [servicenow, itsm, incidents]
---

# ServiceNau 34.1: Incident creation

Catalog objective: create an incident with a category and a priority.
Key assertion: an incident number is generated and the incident is assigned.

## Fill in the incident
Type "Cannot connect to the warehouse portal" into "Short description", select "Software" in "Category", select "2 - Medium" in "Impact" and "1 - High" in "Urgency".

## Verify the priority is derived, not typed
Verify "Priority (derived)" reads "2 - High" and "Routes to" reads "Application Support".

## Submit it
Click "Submit" and verify a green card titled "Incident created" appears.

## Verify the number and the assignment
Verify the card shows "Number" of "INC0024501", "Category" of "Software", "Priority" of "2 - High", "Assignment group" of "Application Support", "Assigned to" of "Mira Shah" and a state of "New".
