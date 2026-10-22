---
mode: testing
url: http://localhost:4321/splitwise-clone-app?reset=true
max_steps: 45
tags: [splitwise, fintech, expenses, rounding]
---

# Splitwyse: Three-way split with rounding

Objective: split $100 three ways and check the leftover cent lands on one person.
Key assertion: shares are $33.34 / $33.33 / $33.33 (summing to $100.00), and the
balances owed to the payer total $66.66, because Alice does not owe her own share.

## Add Alice, Bob and Carol to the group
Type "Alice" into "Name" and click "Add person", type "Bob" into "Name" and click "Add person", then type "Carol" into "Name" and click "Add person", and verify the People card lists "Alice", "Bob" and "Carol".

## Add the taxi expense split three ways
Type "Taxi" into "Description", type "100" into "Amount", select "Alice" in "Paid by", and click "Add expense", and verify the Taxi row in the Expenses card shows "Alice $33.34, Bob $33.33, Carol $33.33".

## Verify the balances
Verify the Balances panel shows exactly two lines, "Bob owes Alice $33.33" and "Carol owes Alice $33.33", each amount with exactly 2 decimal places.
