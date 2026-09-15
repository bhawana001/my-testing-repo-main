---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana-clone-app/my-tasks?reset=true
max_steps: 40
tags: [asana, work-collab, tasks]
---

# Asanah 40.4: My Tasks sort

Catalog objective: verify My Tasks groups by due date.
Key assertion: tasks appear in the correct sections.

## Verify the scope of the view
Verify the page subtitle says the view is assigned to "Priya Nair" and today is "2026-09-16", and "Tasks assigned to me" reads 2.

## Verify the Today group
Verify the "Today (1)" card contains "Write the launch note" with the due date "2026-09-16" and a "Today" badge.

## Verify the Upcoming group
Verify the "Upcoming (1)" card contains "Book the launch webinar" with the due date "2026-09-19" and an "Upcoming" badge.

## Verify the empty groups
Verify the "Overdue (0)" and "Later (0)" cards are both present and read "Nothing here."
