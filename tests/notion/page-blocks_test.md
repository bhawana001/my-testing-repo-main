---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion-clone-app/page/home?reset=true
max_steps: 45
tags: [notion, work-collab, documents]
---

# Notiond 38.1: Page creation with blocks

Catalog objective: create a page with heading, to-do and table blocks.
Key assertion: the blocks render and persist after a reload.

## Add a heading block
Select "Heading" in "Block type", type "Launch checklist" into "Content", click "Add block", and verify a green banner reads "Heading block added."

## Add a to-do block
Select "To-do" in "Block type", type "Send the release note" into "Content", click "Add block", and verify the page body shows a checkbox labelled "Send the release note".

## Add a table block
Select "Table" in "Block type", type "Freeze window" into "Content", click "Add block", and verify the page body contains a table whose header row reads "Item", "Owner", "Status".

## Verify the blocks persist after a reload
Verify "Block count" reads 5, then reload https://my-testing-repo-main.vercel.app/notion-clone-app/page/home and verify "Block count" still reads 5 and the text "Launch checklist" and "Send the release note" are both still on the page.
