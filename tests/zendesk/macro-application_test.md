---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk-clone-app/agent?reset=true
max_steps: 45
tags: [zendesk, support, productivity]
---

# Zendisk 30.3: Macro application

Catalog objective: apply a macro to a ticket.
Key assertion: the macro's fields and reply text are both applied.

## Open the ticket
Click "Open" on ticket 4412 and verify "Priority" reads "Urgent" and "Type" reads "Incident".

## Apply a macro
Select "Refund — approved" in "Apply a macro".

## Verify the reply text was inserted
Verify the "Public reply" box now contains "I've approved your refund and it will land back on your original payment method within 5 working days."

## Verify the macro's field updates were applied
Verify "Status" now reads "Pending", "Priority" reads "Normal", "Type" reads "Question" and the tags include "refund" and "approved".
