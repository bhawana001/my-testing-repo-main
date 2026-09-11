---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/database-filter-sort?reset=true
max_steps: 45
tags: [notion, work-collab, crud]
---

# Notionly 38.2: Database filter and sort

Catalog objective: filter a database by status and sort by date.
Key assertion: the view shows only matching rows, sorted.

## Open the database
Go to https://my-testing-repo-main.vercel.app/notion/database-filter-sort?reset=true and verify "Launch tasks" shows "6 of 6" rows.

## Filter
Select "Status is In progress" and verify "3 of 6" with every row's status "In progress".

## Sort
Select "Date ↑ ascending" and verify the rows appear in this order: "Onboarding emails" (2026-09-15), "Write launch blog" (2026-09-18), "Partner webinar" (2026-09-22).
