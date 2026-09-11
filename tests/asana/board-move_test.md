---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana/board-move?reset=true
max_steps: 45
tags: [asana, work-collab, crud]
---

# Asanah 40.2: Project board move

Catalog objective: move a task across board columns.
Key assertion: the section is updated and history is logged.

## Open the board
Go to https://my-testing-repo-main.vercel.app/asana/board-move?reset=true and verify "Draft homepage copy" is in the "To do" column.

## Move the task
Drag "Draft homepage copy" into the "Doing" column.

## Verify section and history
Click the "Draft homepage copy" card and verify Section reads "Doing" and Activity shows "Demo User moved this task from To do to Doing".
