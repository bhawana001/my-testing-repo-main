---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/subtask-dependency?reset=true
max_steps: 45
tags: [asana, work-collab, crud]
---

# Asanah 40.3: Subtask and dependency

Catalog objective: add a subtask and mark a dependency.
Key assertion: the dependency blocks completion correctly.

## Add a subtask
Go to https://my-testing-repo-main.vercel.app/asana/subtask-dependency?reset=true, type "Schedule social posts" into "Add subtask", click "Add", and verify it appears under Subtasks.

## Set the dependency
Select "Finalize ad copy" in "Mark as blocked by…", click "Set dependency", and verify "Blocked by: Finalize ad copy".

## Try to complete the blocked task
Click "Mark complete" on "Launch campaign" and verify "“Launch campaign” is blocked by “Finalize ad copy”. Complete it first." and that it is not completed.

## Complete the blocker, then the task
Click "Mark complete" on "Finalize ad copy", then click "Mark complete" on "Launch campaign", and verify "“Launch campaign” marked complete." and "Blocked by: Finalize ad copy (done)".
