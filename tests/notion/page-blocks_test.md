---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/page-blocks?reset=true
max_steps: 45
tags: [notion, work-collab, custom]
---

# Notionly 38.1: Page creation with blocks

Catalog objective: create a page with heading, to-do and table blocks.
Key assertion: blocks render and persist after reload.

## Title
Go to https://my-testing-repo-main.vercel.app/notion/page-blocks?reset=true, type "Launch plan" into the "Untitled" title, and verify the sidebar shows "Launch plan".

## Heading block
Click "+ Add block", choose "Heading 1", and type "Goals" into the heading.

## To-do block
Click "+ Add block", choose "To-do list", type "Book venue", and check its checkbox so it shows as done.

## Table block
Click "+ Add block", choose "Table", type "Owner" into the first cell and "Priya" into the cell next to it.

## Verify after reload
Reload the page without the reset parameter and verify the title "Launch plan", the heading "Goals", the checked to-do "Book venue", and the table cells "Owner" and "Priya" are all still there.
