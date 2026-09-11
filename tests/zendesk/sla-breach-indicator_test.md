---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/sla-breach-indicator?reset=true
max_steps: 40
tags: [zendesk, support-saas, tracker]
---

# Zendeskly 30.5: SLA breach indicator

Catalog objective: verify the SLA timer displays on a priority ticket.
Key assertion: the timer is visible with the correct target.

## Open the SLA view
Go to https://my-testing-repo-main.vercel.app/zendesk/sla-breach-indicator?reset=true and verify the ticket table lists #1050 (Urgent), #1049 (High) and #1047 (Normal) with a "Next SLA breach" column.

## Verify the urgent ticket's SLA
Verify the detail panel for "#1050 · Production API returning 500s" shows Priority "Urgent", SLA metric "First reply time", Target "1 hour", and a "Time remaining" countdown starting around "00:42".

## Verify the countdown and breach state
Verify the "Time remaining" value decreases after a few seconds, the status reads "Active · counting down", and ticket #1049 in the table shows a red "Breached" timer.
