---
test: ../page-blocks_test.md
status: passed
started: 2026-09-13T16:39:30.881Z
duration_s: 170
session_id: 8999de3c-39e6-40bc-b2f3-dbadaf68d631
---

# Notionly 38.1: Page creation with blocks — Result

## Title ✓ passed (20.8s)
md5: 79aa8ded5c7901266a9386d9125dcefb
Go to https://my-testing-repo-main.vercel.app/notion/page-blocks?reset=true, type "Launch plan" into the "Untitled" title, and verify the sidebar shows "Launch plan".

## Heading block ✓ passed (27.7s)
md5: 2bda387ca777d244fd6531f264ec47e1
Click "+ Add block", choose "Heading 1", and type "Goals" into the heading.

## To-do block ✓ passed (47.5s)
md5: 3aa8962b6ad3fb9b6abbf12fe42d1941
Click "+ Add block", choose "To-do list", type "Book venue", and check its checkbox so it shows as done.

## Table block ✓ passed (36.6s)
md5: a81aefa7a9588ce6343d0961918e3a06
Click "+ Add block", choose "Table", type "Owner" into the first cell and "Priya" into the cell next to it.

## Verify after reload ✓ passed (35.4s)
md5: d7813b209de9061564fd72e0b0ff7792
Reload the page without the reset parameter and verify the title "Launch plan", the heading "Goals", the checked to-do "Book venue", and the table cells "Owner" and "Priya" are all still there.
