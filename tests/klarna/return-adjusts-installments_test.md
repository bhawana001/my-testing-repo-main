---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna/return-adjusts-installments?reset=true
max_steps: 40
tags: [klarna, payments-infra, tracker]
---

# Klarnah 14.4: Return adjusts installments

Catalog objective: register a return and verify the remaining installments are recalculated (mobile web equivalent).
Key assertion: the schedule updates to the reduced amount.

## Open the order
Go to https://my-testing-repo-main.vercel.app/klarna/return-adjusts-installments?reset=true and verify "Original total" $180.00, "Remaining balance" $135.00, and instalments 2, 3 and 4 each "$45.00" marked "Upcoming".

## Report a return
Click "Report a return", check "Linen lamp shade · $60.00", choose "Changed my mind" as the reason, click "Register return", and verify the message "Return registered for Linen lamp shade." appears.

## Verify the recalculated schedule
Verify "Returned" reads "−$60.00", "Remaining balance" reads "$75.00", instalment 1 stays "$45.00" "Paid", and instalments 2, 3 and 4 each read "$25.00".
