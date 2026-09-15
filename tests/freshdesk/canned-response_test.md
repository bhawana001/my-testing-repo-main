---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk-clone-app/tickets?reset=true
max_steps: 45
tags: [freshdesk, support, productivity]
---

# Freshdesc 33.2: Canned response insert

Catalog objective: insert a canned response in a reply.
Key assertion: the response text is inserted with the placeholders resolved.

## Open the ticket
Click "#1041" in the queue and verify the detail card title reads "#1041 — Cannot export my report" with a requester of "Sam Rivera".

## Insert the canned response
Select "Acknowledge receipt" in "Canned response", click "Insert canned response", and verify a green banner reads "“Acknowledge receipt” inserted with placeholders resolved."

## Verify the placeholders were resolved
Verify the reply box begins "Hi Sam," and contains "Thanks for getting in touch about “Cannot export my report”. Your ticket is #1041 and I am looking into it now." and ends with "Priya from Acme Support".

## Verify no raw placeholders remain
Verify the reply box contains no "{{requester_first_name}}", "{{ticket_id}}" or "{{ticket_subject}}" text.
