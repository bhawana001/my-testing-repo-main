---
mode: testing
url: http://localhost:4321/splitwise-clone-app?reset=true
max_steps: 45
tags: [splitwise, fintech, persistence]
---

# Splitwyse: Group survives a page reload

Objective: people and expenses are saved in localStorage and come back after a reload.
Key assertion: after reloading without ?reset=true, the same people, expense and balance are shown
and the localStorage key "clone:splitwise" holds the expense.

## Add Alice and Bob to the group
Type "Alice" into "Name" and click "Add person", then type "Bob" into "Name" and click "Add person", and verify the People card lists "Alice" and "Bob".

## Add the dinner expense
Type "Dinner" into "Description", type "50" into "Amount", select "Alice" in "Paid by", and click "Add expense", and verify the Balances panel shows "Bob owes Alice $25.00".

## Reload the page
Go to http://localhost:4321/splitwise-clone-app (this exact URL, with no query string), and verify the People card lists "Alice" and "Bob", the Expenses card lists "Dinner" for "$50.00", and the Balances panel shows "Bob owes Alice $25.00".

## Verify the saved data
Verify the browser localStorage key "clone:splitwise" exists and its value contains the text "Dinner".
