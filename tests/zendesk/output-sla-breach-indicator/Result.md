---
test: ../sla-breach-indicator_test.md
status: passed
started: 2026-09-15T06:47:22.779Z
duration_s: 110
session_id: 25fa5d1d-b0ac-4eb6-aa32-a7215f241004
---

# Zendeskly 30.5: SLA breach indicator — Result

## Open the SLA view ✓ passed (1.21s)
md5: 60792a606f7b0decd573f543bf60c689
Go to https://my-testing-repo-main.vercel.app/zendesk/sla-breach-indicator?reset=true and verify the ticket table lists #1050 (Urgent), #1049 (High) and #1047 (Normal) with a "Next SLA breach" column.

## Verify the urgent ticket's SLA ✓ passed (29.9s)
md5: 9abe4d5afb241951c97843c603e9f857
Verify the detail panel for "#1050 · Production API returning 500s" shows Priority "Urgent", SLA metric "First reply time", Target "1 hour", and a "Time remaining" countdown starting around "00:42".

## Verify the countdown and breach state ✓ passed (76.4s)
md5: fa298f285a3732fa753f9b573d088ab2
Verify the "Time remaining" value decreases after a few seconds, the status reads "Active · counting down", and ticket #1049 in the table shows a red "Breached" timer.
