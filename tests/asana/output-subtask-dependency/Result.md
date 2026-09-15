---
test: ../subtask-dependency_test.md
status: passed
started: 2026-09-15T06:55:50.762Z
duration_s: 149
session_id: 43c564ff-d4c8-4960-98a8-7d4b614e97f8
---

# Asanah 40.3: Subtask and dependency — Result

## Add a subtask ✓ passed (32.1s)
md5: b20936e08e6f6a440f791245d7e4731a
Go to https://my-testing-repo-main.vercel.app/asana/subtask-dependency?reset=true, type "Schedule social posts" into "Add subtask", click "Add", and verify it appears under Subtasks.

## Set the dependency ✓ passed (34.2s)
md5: 6428616a06d44e43b9afff4322c679b9
Select "Finalize ad copy" in "Mark as blocked by…", click "Set dependency", and verify "Blocked by: Finalize ad copy".

## Try to complete the blocked task ✓ passed (42.6s)
md5: a92498963003209be75e536b5a6fdd55
Click "Mark complete" on "Launch campaign" and verify "“Launch campaign” is blocked by “Finalize ad copy”. Complete it first." and that it is not completed.

## Complete the blocker, then the task ✓ passed (38.3s)
md5: 3d4b26575985cd4bda996d46400ca6f1
Click "Mark complete" on "Finalize ad copy", then click "Mark complete" on "Launch campaign", and verify "“Launch campaign” marked complete." and "Blocked by: Finalize ad copy (done)".
