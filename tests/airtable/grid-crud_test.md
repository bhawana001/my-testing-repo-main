---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable-clone-app/grid?reset=true
max_steps: 45
tags: [airtable, work-collab, database]
---

# Airtabel 39.1: Grid record CRUD

Catalog objective: create, edit and delete a record in the grid view.
Key assertion: the changes persist across a reload.

## Create a record
Type "Mobile nav polish" into "Name", select "Dan Okafor" in "Owner", select "Backlog" in "Stage", click "Create record", and verify a green banner reads "Record rec004 created." and "Record count" reads 4.

## Edit the record
Click "Edit" on the "rec004" row, replace the "Name" with "Mobile nav polish v2", click "Save", and verify a green banner reads "Record rec004 updated." and the rec004 row now reads "Mobile nav polish v2".

## Verify the edit persists across a reload
Reload https://my-testing-repo-main.vercel.app/airtable-clone-app/grid and verify "Record count" still reads 4 and the rec004 row still reads "Mobile nav polish v2".

## Delete the record
Click "Delete" on the "rec004" row and verify a banner reads "Record rec004 deleted." and "Record count" reads 3.
