---
mode: testing
url: https://my-testing-repo-main.vercel.app/asana-clone-app/board?reset=true
max_steps: 40
tags: [asana, work-collab, board]
---

# Asanah 40.2: Project board move

Catalog objective: move a task across board columns.
Key assertion: the section is updated and the move is logged in the history.

## Verify where the task starts
Verify the "To do (3)" column holds the card "Write the launch note" and the "In progress (1)" column holds "Sign off the pricing page".

## Move it across columns
On the "Write the launch note" card, select "In progress" in its "Section for Write the launch note" dropdown, and verify a green banner reads "Write the launch note moved from To do to In progress — logged in the task history."

## Verify the columns updated
Verify the column headings now read "To do (2)" and "In progress (2)".

## Verify the move is in the task history
Go to https://my-testing-repo-main.vercel.app/asana-clone-app/task/t1 and verify the History card contains the entry "Moved from To do to In progress" and "Section" reads "In progress".
