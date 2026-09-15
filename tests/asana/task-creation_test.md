---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana-clone-app/tasks?reset=true
max_steps: 40
tags: [asana, work-collab, tasks]
---

# Asanah 40.1: Task creation with assignee

Catalog objective: create a task with an assignee and a due date.
Key assertion: the task appears in the list and the assignee is notified.

## Fill in the task
Type "Prepare the press kit" into "Task name", select "Mira Shah" in "Assignee", set "Due date" to "2026-09-17", select "To do" in "Section", and verify "Assignee" reads "Mira Shah".

## Create it
Click "Create task" and verify a green banner reads "Task created and Mira Shah was notified."

## Verify the task is in the list
Verify "Task count" reads 5 and the table has a row "Prepare the press kit" with assignee "Mira Shah", due "2026-09-17" and section "To do".

## Verify the assignee was notified
Verify the Notifications card shows an entry for "Mira Shah" reading "Priya Nair assigned you “Prepare the press kit”, due 2026-09-17".
