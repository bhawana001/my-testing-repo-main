---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion-clone-app/database?reset=true
max_steps: 40
tags: [notion, work-collab, database]
---

# Notiond 38.2: Database filter and sort

Catalog objective: filter a database by status and sort by date.
Key assertion: the view shows only the matching rows, in sorted order.

## Verify the unfiltered view
Verify the View card shows "Rows shown" of "5 of 5".

## Filter by status
Select "In progress" in "Filter by status" and verify "Rows shown" now reads "2 of 5" and the table lists only "Checkout redesign" and "Mobile nav polish".

## Sort by due date
Select "Due date, earliest first" in "Sort by due date" and verify the first row is "Checkout redesign" with a due date of "2026-09-18" and the second row is "Mobile nav polish" with "2026-09-25".

## Reverse the sort
Select "Due date, latest first" and verify the first row is now "Mobile nav polish" with "2026-09-25".
