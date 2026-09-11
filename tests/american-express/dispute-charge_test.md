---
mode: testing
url: https://my-testing-repo-main.vercel.app/american-express/dispute-charge?reset=true
max_steps: 40
tags: [american-express, banking, wizard]
---

# Amerix 25.3: Dispute a charge

Catalog objective: start a dispute on a recent charge.
Key assertion: a case is opened with confirmation.

## Open the dispute wizard
Go to https://my-testing-repo-main.vercel.app/american-express/dispute-charge?reset=true and verify the step "Select the charge to dispute" lists "GRAND HOTEL PLAZA · $612.00", "STREAMING SERVICE · $15.99" and "ELECTRONICS DEPOT · $249.00".

## Choose the charge and reason
Choose "ELECTRONICS DEPOT · $249.00", click "Continue", choose "The amount is wrong", type "Charged $249 instead of $199." into Details, click "Continue", and verify the review step shows the charge and reason.

## Open the dispute
Click "Open dispute" and verify the confirmation "Your dispute has been opened" with the badge "Case opened".

## Verify the case number
Verify a "Case number" starting with "INQ-" is shown and the text "You don't need to pay the disputed amount while we investigate." is displayed.
