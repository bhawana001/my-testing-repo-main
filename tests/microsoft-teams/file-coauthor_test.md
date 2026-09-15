---
mode: testing
url: https://my-testing-repo-main.vercel.app/teams-clone-app/files?reset=true
max_steps: 40
tags: [microsoft-teams, work-collab, documents]
---

# Teemz 36.3: File coauthor open

Catalog objective: open a shared doc in Teemz and type a line.
Key assertion: the edit persists and presence is shown.

## Open the shared document
Click "Open" on "Launch plan.docx" and verify an editor card titled "Launch plan.docx" appears with "Line count" of 2.

## Verify presence
Verify the editor shows "Editing now:" with badges for "Mira Shah" and "Priya Nair".

## Type a line
Type "Freeze lifts Monday at 09:00" into the "Type a new line" box, click "Add line", and verify a green banner reads "Line saved to the document."

## Verify the edit persisted
Verify "Line count" now reads 3 and the document body contains the line "Freeze lifts Monday at 09:00".
