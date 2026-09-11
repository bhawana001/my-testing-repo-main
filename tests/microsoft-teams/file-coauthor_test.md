---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/file-coauthor?reset=true
max_steps: 45
tags: [microsoft-teams, work-collab, custom]
---

# Teamz 36.3: File coauthor open

Catalog objective: open a shared doc in Teamz and type a line.
Key assertion: the edit persists and presence is shown.

## Open the doc
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/file-coauthor?reset=true, click "Open in Teamz" next to "Q3 plan.docx", and verify the editor shows "Q3 plan" with two plan lines and presence "Priya Nair is editing".

## Type a line
Type "3. Expand to two new regions" into the new-line box, click "Add line", and verify the line appears and the save badge reads "Saved".

## Verify persistence
Reload the page without the reset parameter and verify the document still contains "3. Expand to two new regions" and still shows "Priya Nair is editing".
