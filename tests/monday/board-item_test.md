---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/board-item?reset=true
max_steps: 45
tags: [monday, work-collab, crud]
---

# Mondayly 42.1: Board item creation

Catalog objective: add an item with status and person columns.
Key assertion: the item row is saved with its values.

## Open the board
Go to https://my-testing-repo-main.vercel.app/monday/board-item?reset=true and verify "Marketing plan · Main table" lists "Write press release" and "Book venue".

## Add an item
Type "Launch webinar" into "+ Add item", select "Priya Nair" as person, "Working on it" as status, set date 2026-09-24, click "Add", and verify a row "Launch webinar" appears.

## Verify after reload
Reload the page without the reset parameter and verify the "Launch webinar" row shows Person "Priya Nair", Status "Working on it" and Date "2026-09-24".
