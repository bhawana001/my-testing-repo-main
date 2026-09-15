---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk-clone-app/tickets?reset=true
max_steps: 45
tags: [freshdesk, support, tickets]
---

# Freshdesc 33.3: Ticket merge

Catalog objective: merge two tickets from the same requester.
Key assertion: the merged ticket contains both threads.

## Open the duplicate ticket
Click "#1042" in the queue and verify the detail card title reads "#1042 — Export still failing" with "Messages in thread" of 1.

## Verify a cross-requester merge is refused
Select "#1043 — Invoice address is wrong (Ana Okonkwo)" in "Merge this ticket into", click "Merge #1042", and verify a red banner reads "Freshdesc only merges tickets from the same requester."

## Merge into the same requester's ticket
Select "#1041 — Cannot export my report (Sam Rivera)" in "Merge this ticket into" and click "Merge #1042", then verify a green banner reads "#1042 merged into #1041. Both threads are on the merged ticket."

## Verify both threads are on the merged ticket
Verify "Ticket count" reads 2, the detail card is now "#1041 — Cannot export my report" with "Merged from" of "#1042", and the thread contains both "The export button spins and nothing downloads." and "Tried again this morning, same thing."
