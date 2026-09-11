---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/canned-response?reset=true
max_steps: 40
tags: [freshdesk, support-saas, crud]
---

# Freshdeskly 33.2: Canned response insert

Catalog objective: insert a canned response in a reply.
Key assertion: the response text is inserted with placeholders resolved.

## Open the ticket
Go to https://my-testing-repo-main.vercel.app/freshdesk/canned-response?reset=true and verify ticket "#2044 · Order #A-7731 not delivered" from Maria Chen with an empty reply box.

## Insert the canned response
Click "Insert canned response", click "Insert" next to "Delivery delay apology", and verify "Inserted canned response: Delivery delay apology".

## Verify resolved placeholders
Verify the reply box starts with "Hi Maria,", contains "ticket #2044", ends with "Demo User", and contains no "{{" placeholder text.
