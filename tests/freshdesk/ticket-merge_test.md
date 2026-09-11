---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/ticket-merge?reset=true
max_steps: 40
tags: [freshdesk, support-saas, crud]
---

# Freshdeskly 33.3: Ticket merge

Catalog objective: merge two tickets from the same requester.
Key assertion: the merged ticket contains both threads.

## Select two tickets
Go to https://my-testing-repo-main.vercel.app/freshdesk/ticket-merge?reset=true, check the boxes for #2044 "Order #A-7731 not delivered" and #2046 "Where is my package?" (both from Maria Chen), and verify "2 selected" with the "Merge" button enabled.

## Merge
Click "Merge", keep #2044 as the primary ticket, click "Merge" in the dialog, and verify "Merged #2046 into #2044."

## Verify the merged thread
Verify ticket #2044 shows "Contains merged ticket #2046" and both messages: "My order #A-7731 hasn't arrived." and "Following up: tracking hasn't updated in 3 days." (from #2046).

## Verify the secondary ticket
Click "All tickets" and verify #2046 shows status "Closed" and "Merged into #2044".
