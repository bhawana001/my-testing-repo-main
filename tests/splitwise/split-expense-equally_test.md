---
mode: testing
url: http://localhost:4321/splitwise-clone-app?reset=true
max_steps: 40
tags: [splitwise, fintech, expenses]
---

# Splitwyse: Split an expense equally (happy path)

Objective: add two people and one shared expense, then read who owes whom.
Key assertion: a $50 dinner paid by Alice and split with Bob leaves Bob owing Alice $25.00.

## Add Alice and Bob to the group
Type "Alice" into "Name" and click "Add person", then type "Bob" into "Name" and click "Add person", and verify the People card lists "Alice" and "Bob".

## Add the dinner expense
Type "Dinner" into "Description", type "50" into "Amount", select "Alice" in "Paid by", and click "Add expense", and verify the Expenses card lists "Dinner" for "$50.00".

## Verify the balance
Verify the Balances panel shows "Bob owes Alice $25.00".
