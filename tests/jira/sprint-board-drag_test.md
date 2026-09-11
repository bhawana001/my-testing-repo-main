---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira/sprint-board-drag?reset=true
max_steps: 45
tags: [jira, work-collab, crud]
---

# Jirah 41.2: Sprint board drag

Catalog objective: move an issue to In Progress on the sprint board.
Key assertion: the status transition is applied with history.

## Open the board
Go to https://my-testing-repo-main.vercel.app/jira/sprint-board-drag?reset=true and verify "WEB-121" (Checkout button misaligned on Safari) is in "To Do".

## Drag
Drag the WEB-121 card into the "In Progress" column.

## Verify status and history
Click the WEB-121 card and verify Status "In Progress" and History "Demo User changed the Status from To Do to In Progress".
