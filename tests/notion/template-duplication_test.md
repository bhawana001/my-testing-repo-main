---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion-clone-app/templates?reset=true
max_steps: 40
tags: [notion, work-collab, templates]
---

# Notiond 38.4: Template duplication

Catalog objective: duplicate a template into the workspace.
Key assertion: the template content is copied into a new page.

## Verify the workspace before duplicating
Verify the Workspace card shows "Pages" of 1.

## Duplicate the template
Click "Duplicate" on "Meeting notes" and verify a green banner titled "Template duplicated" says "Meeting notes" was copied into the workspace with 4 blocks.

## Verify the workspace grew
Verify the Workspace card now shows "Pages" of 2.

## Verify the copied content
Click "Open the new page" and verify the page title reads "Meeting notes", "Block count" reads 4, and the page body contains "Attendees:", "Share the recording" and "File follow-up tickets".
