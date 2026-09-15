---
test: ../database-filter-sort_test.md
status: passed
started: 2026-09-13T16:42:39.680Z
duration_s: 101
session_id: 7634cce7-6733-4ccb-8a3d-b0a432ce9b96
---

# Notionly 38.2: Database filter and sort — Result

## Open the database ✓ passed (28.8s)
md5: 4fd8741667ea9d542a00f2d390933311
Go to https://my-testing-repo-main.vercel.app/notion/database-filter-sort?reset=true and verify "Launch tasks" shows "6 of 6" rows.

## Filter ✓ passed (34.3s)
md5: b71fc577b91ab2a585e384aacb3a8e90
Select "Status is In progress" and verify "3 of 6" with every row's status "In progress".

## Sort ✓ passed (35s)
md5: 97214a5a249b335e472e45d937b117cf
Select "Date ↑ ascending" and verify the rows appear in this order: "Onboarding emails" (2026-09-15), "Write launch blog" (2026-09-18), "Partner webinar" (2026-09-22).
