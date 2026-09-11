---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/task-creation?reset=true
max_steps: 45
tags: [asana, work-collab, crud]
---

# Asanah 40.1: Task creation with assignee

Catalog objective: create a task with an assignee and due date.
Key assertion: the task is in the list and the assignee is notified.

## Create the task
Go to https://my-testing-repo-main.vercel.app/asana/task-creation?reset=true, type "Prepare launch email" into Task name, select "Priya Nair" as Assignee, set the due date to 2026-09-18, and click "Add task".

## Verify the list
Verify the Tasks table shows "Prepare launch email" with assignee "Priya Nair" and due date "2026-09-18".

## Verify the notification
Click "Priya" in the top bar and verify the Inbox badge shows 1 and the entry "Demo User assigned you a task: Prepare launch email" with "Due 2026-09-18".
