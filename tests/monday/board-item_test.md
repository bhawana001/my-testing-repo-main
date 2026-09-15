---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday-clone-app/board/launch?reset=true
max_steps: 40
tags: [monday, work-collab, board]
---

# Mondee 42.1: Board item creation

Catalog objective: add an item with status and person columns.
Key assertion: the item row is saved with those values.

## Fill in the new item
Type "Order the catering" into "Item name", select "Working on it" in "Status", select "Mira Shah" in "Person", set "Due" to "2026-09-22", and verify "Person" reads "Mira Shah".

## Add it
Click "Add item" and verify a green banner reads "Item added with status Working on it and Mira Shah on the person column."

## Verify the row was saved with its column values
Verify "Item count" reads 4 and the table has a row "Order the catering" with a "Working on it" status badge, a person of "Mira Shah" and a due date of "2026-09-22".

## Verify it persists
Reload https://my-testing-repo-main.vercel.app/monday-clone-app/board/launch and verify the "Order the catering" row is still present with "Mira Shah" in the person column.
