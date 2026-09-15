---
test: ../grid-crud_test.md
status: passed
started: 2026-09-12T16:19:32.992Z
duration_s: 186
session_id: 5a9b213f-4444-4826-b5ab-e3d1fd31d797
---

# Airtably 39.1: Grid record CRUD — Result

## Open the grid ✓ passed (0.85s)
md5: 481c19b9fe59d34e93b3284cff684df7
Go to https://my-testing-repo-main.vercel.app/airtable/grid-crud?reset=true and verify the heading "Launch tasks" is visible and the grid lists 3 records: "Write launch blog post", "QA the checkout flow" and "Design onboarding email", with the count "3 of 3".

## Create a record ✓ passed (12.12s)
md5: 36da7fc881df5565e3c39c328fbb2446
Click "+ Add record", type "Ship pilot flows" into "Name", select "In progress" for "Status", and click "Create". Verify a new row "rec-4" with name "Ship pilot flows" and status "In progress" appears and the count reads "4 of 4".

## Edit the record ✓ passed (2.57s)
md5: 7654143d11479f0c94b167bb7e8435d5
Click the "Edit" button on the "Ship pilot flows" row, change "Name" to "Ship pilot flows (edited)", and click "Save changes". Verify the row now reads "Ship pilot flows (edited)".

## Delete a record ✓ passed (35.1s)
md5: a5ea66f12b5151f7e0551724de333052
Click the "Delete" button on the "Design onboarding email" row. Verify that row is gone and the count reads "3 of 3".

## Verify persistence after reload ✓ passed (41.3s)
md5: ada0f654a17c220cb6e66000c0f4ce39
Reload the page (without the reset parameter). Verify the grid still shows "Ship pilot flows (edited)" and does not show "Design onboarding email", with the count "3 of 3".
