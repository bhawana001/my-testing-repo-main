---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday-clone-app/dashboard?reset=true
max_steps: 40
tags: [monday, work-collab, reporting]
---

# Mondee 42.3: Dashboard widget

Catalog objective: add a chart widget over board data.
Key assertion: the chart reflects the board's numbers.

## Verify the dashboard is empty
Verify "Widgets" reads 0 and the page says no widgets are on the dashboard yet.

## Add the chart widget
Select "Launch plan" in "Board", click "Add chart widget", and verify "Widgets" now reads 1 with a card titled "Launch plan by status".

## Verify the widget names its source
Verify the widget shows the badge "Source: Launch plan · 3 items".

## Verify the chart matches the board data
Verify the chart bars read "Working on it" 1, "Stuck" 1, "Done" 1 and "Not started" 0, and the widget summary line reads "Working on it: 1 · Stuck: 1 · Done: 1 · Not started: 0".
