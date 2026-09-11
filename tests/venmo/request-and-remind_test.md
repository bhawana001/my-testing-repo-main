---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo/request-and-remind?reset=true
max_steps: 40
tags: [venmo, consumer-fintech, feed]
---

# Venmoo 22.2: Request and remind

Catalog objective: request money and send a reminder (mobile web equivalent).
Key assertion: the request is pending with a reminder-sent state.

## Create a request
Go to https://my-testing-repo-main.vercel.app/venmo/request-and-remind?reset=true, type "30" into Amount and "Dinner" into Note, click "Request", and verify an outgoing request "Priya Nair · $30.00 · Dinner" appears with status "Pending" and "No reminder sent".

## Remind
Click "Remind" on that request.

## Verify the reminder state
Verify the request still shows status "Pending" and the reminder line reads "Reminder sent (1) · Just now".
