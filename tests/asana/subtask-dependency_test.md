---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana-clone-app/task/t1?reset=true
max_steps: 45
tags: [asana, work-collab, tasks]
---

# Asanah 40.3: Subtask and dependency

Catalog objective: add a subtask and mark a dependency.
Key assertion: the dependency blocks completion correctly.

## Add a subtask
Type "Draft the copy" into "Add a subtask", click "Add subtask", and verify "Subtask count" reads 1 with a checkbox labelled "Draft the copy".

## Set a dependency
Select "Sign off the pricing page" in the "Blocked by" dropdown and verify "Blocked by" reads "Sign off the pricing page" and a red badge reads "Blocked by Sign off the pricing page".

## Try to complete the blocked task
Click "Mark complete" and verify a red banner reads "Cannot complete — this task is blocked by “Sign off the pricing page”, which is still open."

## Verify the task is still open
Verify "Status" still reads "Open".
