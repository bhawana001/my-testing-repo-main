---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable-clone-app/form?reset=true
max_steps: 40
tags: [airtable, work-collab, forms]
---

# Airtabel 39.2: Form view submission

Catalog objective: submit the shared form and verify a row is created.
Key assertion: a new record exists with the submitted values.

## Fill the shared form
Type "Warehouse label printing" into "Name", select "Mira Shah" in "Owner", select "8" in "Effort", and verify "Name" reads "Warehouse label printing".

## Submit it
Click "Submit" and verify a green card titled "Thanks — your response was recorded" appears.

## Verify the created record
Verify the confirmation shows "Record id" of "rec004", "Name" of "Warehouse label printing", "Owner" of "Mira Shah", "Stage" of "Backlog" and "Records in base" of 4.

## Verify the row is in the base
Click "See it in the grid" and verify the grid shows "Record count" of 4 with a "rec004" row reading "Warehouse label printing".
