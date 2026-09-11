---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/card-dispute?reset=true
max_steps: 40
tags: [chase, banking, wizard]
---

# Chaise Bank 23.5: Credit card dispute

Catalog objective: dispute a transaction with reason selection.
Key assertion: the dispute is submitted with a case reference.

## Open disputes
Go to https://my-testing-repo-main.vercel.app/chase/card-dispute?reset=true and verify the wizard "Which transaction do you want to dispute?" lists "AIRLINE TICKETS INC · $412.80", "GADGET WORLD ONLINE · $89.00" and "CAFE LUNA · $14.20".

## Choose the transaction and reason
Choose "GADGET WORLD ONLINE · $89.00", click "Continue", choose "I was charged more than once", click "Continue", and verify the validation message "Please describe what happened." is shown.

## Add details and review
Type "Charged twice on the same day." into Additional details, click "Continue", and verify the review step lists the transaction and reason.

## Submit
Click "Submit dispute" and verify the confirmation "We're reviewing your dispute" with the badge "Dispute submitted".

## Verify the case reference
Verify a "Case reference" starting with "DSP-2026-" is displayed along with "Provisional credit" and "Expected resolution" rows.
