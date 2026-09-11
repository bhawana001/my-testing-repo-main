---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/macro-application?reset=true
max_steps: 40
tags: [zendesk, support-saas, crud]
---

# Zendeskly 30.3: Macro application

Catalog objective: apply a macro to a ticket.
Key assertion: macro fields and reply text are applied.

## Open the ticket
Go to https://my-testing-repo-main.vercel.app/zendesk/macro-application?reset=true and verify ticket "#1043 · Charged twice for September" with fields Type "-", Priority "Normal", Status "Open", Tags "web" and an empty reply box.

## Apply the macro
Select "Billing: Refund processed" in the "Apply macro…" dropdown, click "Apply", and verify the message "Macro applied: Billing: Refund processed".

## Verify fields and reply
Verify Type reads "Question", Priority "Low", Status "Solved", Tags "web, billing, refund", and the reply box begins with "Hi Maria," and mentions "a refund of $49.00".
