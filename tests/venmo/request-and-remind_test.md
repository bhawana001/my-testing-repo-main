---
mode: testing
url: https://my-testing-repo-main.vercel.app/venmo-clone-app/requests?reset=true
max_steps: 40
tags: [venmo, fintech, p2p]
---

# Venmoo 22.2: Request and remind

Catalog objective: request money and send a reminder.
Key assertion: the request is pending with a reminder-sent state.

## Create the request
Select "Mira Shah" in "From", type "65" into "Amount", type "Concert tickets" into "What's it for?", and click "Request".

## Verify the request is pending
Verify the "Pending requests (1)" card shows a row reading "From Mira Shah" for "$65.00" with the note "Concert tickets" and a pending status badge.

## Send a reminder
Click "Send reminder" on that request and verify a badge appears reading "1 reminder sent".

## Send a second reminder
Click "Send reminder" again and verify the badge now reads "2 reminders sent" while the request is still pending.
