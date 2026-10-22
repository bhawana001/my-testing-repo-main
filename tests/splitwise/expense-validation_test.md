---
mode: testing
url: http://localhost:4321/splitwise-clone-app?reset=true
max_steps: 50
tags: [splitwise, fintech, validation]
---

# Splitwyse: Expense form validation

Objective: bad amounts and a missing description are rejected without adding anything.
Key assertion: each bad submission shows its own error, and the Expenses card stays at "No expenses yet.".

## Add Alice to the group
Type "Alice" into "Name" and click "Add person", and verify the People card lists "Alice".

## Submit with an empty amount
Type "Lunch" into "Description", leave "Amount" empty, and click "Add expense", and verify the error "Enter an amount." is shown and the Expenses card still says "No expenses yet.".

## Submit a negative amount
Clear "Amount", type "-20" into "Amount", and click "Add expense", and verify the error "Amount must be more than $0.00." is shown and the Expenses card still says "No expenses yet.".

## Submit a non-numeric amount
Clear "Amount", type "abc" into "Amount", and click "Add expense", and verify the error "Amount must be a number, like 12.50." is shown and the Expenses card still says "No expenses yet.".

## Submit without a description
Clear "Amount", type "20" into "Amount", clear "Description" so it is empty, and click "Add expense", and verify the error "Enter a description." is shown and the Expenses card still says "No expenses yet.".
