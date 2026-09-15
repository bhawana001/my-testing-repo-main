---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable-clone-app/kanban?reset=true
max_steps: 40
tags: [airtable, work-collab, board]
---

# Airtabel 39.3: Kanban stage drag

Catalog objective: move a card to a new stage.
Key assertion: the stage field on the record is updated.

## Verify where the card starts
Verify the "Backlog (1)" column holds the card "Search relevance" and the "Review (0)" column is empty.

## Move the card
On the "Search relevance" card, select "Review" in its "Move Search relevance" dropdown, and verify a green banner reads "Search relevance moved from Backlog to Review."

## Verify the columns changed
Verify the column headings now read "Backlog (0)" and "Review (1)" and the "Search relevance" card sits in the Review column.

## Verify the stage field on the record
Verify the "Stage field on each record" card shows "rec002 — Search relevance" with the value "Review".
