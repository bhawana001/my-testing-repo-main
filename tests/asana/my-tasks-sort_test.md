---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/my-tasks-sort?reset=true
max_steps: 45
tags: [asana, work-collab, crud]
---

# Asanah 40.4: My Tasks sort

Catalog objective: verify My Tasks groups by due date.
Key assertion: tasks appear in the correct sections.

## Open My Tasks
Go to https://my-testing-repo-main.vercel.app/asana/my-tasks-sort?reset=true and verify "Group: Due date" is selected and the note "Today is Monday, September 14, 2026".

## Verify sections
Verify "Overdue" contains "Send invoice to Globex" (2026-09-11), "Today" contains "Review PR #482" and "1:1 prep with Priya", "This week" contains "Draft Q4 OKRs" (2026-09-17), "Later" contains "Renew SSL certificate" (2026-09-29), and "No due date" contains "Read design doc".
