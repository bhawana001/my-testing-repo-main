---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira-clone-app/board?reset=true
max_steps: 40
tags: [jira, work-collab, board]
---

# Jiira 41.2: Sprint board drag

Catalog objective: move an issue to In Progress on the sprint board.
Key assertion: the status transition is applied and recorded in the history.

## Verify where the issue starts
Verify the "To Do (2)" column holds the card "ACME-102" and the "In Progress (1)" column holds "ACME-101".

## Move the issue
On the "ACME-102" card, select "In Progress" in its "Status for ACME-102" dropdown, and verify a green banner reads "ACME-102 transitioned To Do → In Progress and the change is in its history."

## Verify the columns updated
Verify the column headings now read "To Do (1)" and "In Progress (2)".

## Verify the transition is in the issue history
Go to https://my-testing-repo-main.vercel.app/jira-clone-app/browse/ACME-102 and verify "Status" reads "In Progress" and the History card contains "Status: To Do → In Progress".
