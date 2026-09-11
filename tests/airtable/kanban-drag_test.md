---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/kanban-drag?reset=true
max_steps: 45
tags: [airtable, work-collab, crud]
---

# Airtably 39.3: Kanban stage drag

Catalog objective: drag a card to a new stage.
Key assertion: the Stage field is updated on the record.

## Open the kanban
Go to https://my-testing-repo-main.vercel.app/airtable/kanban-drag?reset=true and verify the card "Dark mode" is in the "Idea" column.

## Drag
Drag the "Dark mode" card into the "In progress" column and verify it now appears there.

## Verify the record
Click the "Dark mode" card and verify the record detail shows Stage "In progress".
