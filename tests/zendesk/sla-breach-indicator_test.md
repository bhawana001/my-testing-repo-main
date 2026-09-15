---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk-clone-app/agent?reset=true
max_steps: 40
tags: [zendesk, support, sla]
---

# Zendisk 30.5: SLA breach indicator

Catalog objective: verify the SLA timer displays on a priority ticket.
Key assertion: the timer is visible with the correct target.

## Open the urgent ticket
Click "Open" on ticket 4412 and verify the page title reads "#4412 · Payment taken twice for order #1188".

## Verify the SLA card is present
Verify a "First reply SLA" card is shown with "Priority" of "Urgent".

## Verify the target matches the priority
Verify "Target" reads "60 minutes", which is the first-reply target for Urgent.

## Verify the elapsed time and the state
Verify "Open for" reads "55 minutes" and the SLA badge reads "5 min remaining", since 55 of the 60 minute target have elapsed.
