---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/dashboard-widget?reset=true
max_steps: 45
tags: [monday, work-collab, crud]
---

# Mondayly 42.3: Dashboard widget

Catalog objective: add a chart widget on board data.
Key assertion: the chart reflects board numbers.

## Open the dashboard
Go to https://my-testing-repo-main.vercel.app/monday/dashboard-widget?reset=true and verify "No widgets yet" and a source table "Board: Marketing plan" with 7 items (3 Done, 2 Working on it, 1 Stuck, 1 Not started).

## Add the chart
Click "+ Add widget", keep "Chart" selected, click "Add to dashboard", and verify a widget "Chart · Items by Status (Marketing plan)" appears.

## Verify the chart matches the board
Verify the chart legend reads "Done: 3", "Working on it: 2", "Stuck: 1" and "Not started: 1", matching the board table.
