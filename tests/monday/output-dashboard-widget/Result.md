---
test: ../dashboard-widget_test.md
status: passed
started: 2026-09-13T18:31:39.623Z
duration_s: 166
session_id: 92ffb81c-e84b-4eca-9d26-7a3e29ddfae7
---

# Mondayly 42.3: Dashboard widget — Result

## Open the dashboard ✓ passed (33.4s)
md5: e8ae8334e31a1cad7aa2b5206fc442d5
Go to https://my-testing-repo-main.vercel.app/monday/dashboard-widget?reset=true and verify "No widgets yet" and a source table "Board: Marketing plan" with 7 items (3 Done, 2 Working on it, 1 Stuck, 1 Not started).

## Add the chart ✓ passed (38.7s)
md5: 32a0ef170cc53bc4a1ed05a65e1873d5
Click "+ Add widget", keep "Chart" selected, click "Add to dashboard", and verify a widget "Chart · Items by Status (Marketing plan)" appears.

## Verify the chart matches the board ✓ passed (92.5s)
md5: 08c3c042f5902fb174510e24212e9ef8
Verify the chart legend reads "Done: 3", "Working on it: 2", "Stuck: 1" and "Not started: 1", matching the board table.
