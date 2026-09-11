---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/grid-crud?reset=true
max_steps: 40
tags: [airtable, work-collab, crud]
---

# Airtably 39.1: Grid record CRUD

Catalog objective: create, edit, and delete a record in grid view.
Key assertion: changes persist across reload.

## Open the grid
Go to https://my-testing-repo-main.vercel.app/airtable/grid-crud?reset=true and verify the heading "Launch tasks" is visible and the grid lists 3 records: "Write launch blog post", "QA the checkout flow" and "Design onboarding email", with the count "3 of 3".

## Create a record
Click "+ Add record", type "Ship pilot flows" into "Name", select "In progress" for "Status", and click "Create". Verify a new row "rec-4" with name "Ship pilot flows" and status "In progress" appears and the count reads "4 of 4".

## Edit the record
Click the "Edit" button on the "Ship pilot flows" row, change "Name" to "Ship pilot flows (edited)", and click "Save changes". Verify the row now reads "Ship pilot flows (edited)".

## Delete a record
Click the "Delete" button on the "Design onboarding email" row. Verify that row is gone and the count reads "3 of 3".

## Verify persistence after reload
Reload the page (without the reset parameter). Verify the grid still shows "Ship pilot flows (edited)" and does not show "Design onboarding email", with the count "3 of 3".
