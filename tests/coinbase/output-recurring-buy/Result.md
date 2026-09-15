---
test: ../recurring-buy_test.md
status: passed
started: 2026-09-13T11:59:11.949Z
duration_s: 142
session_id: 43d8cf28-ed60-457b-b358-711a13744b1a
---

# Coinbayse 18.2: Recurring buy setup — Result

## Open recurring buy ✓ passed (23s)
md5: b8c38014e6f057c53acbd0772cf979c1
Go to https://my-testing-repo-main.vercel.app/coinbase/recurring-buy?reset=true and verify the step "Recurring buy" with the note "Today is Monday, September 14, 2026." and an empty "Recurring buys" list.

## Set up weekly ✓ passed (46.3s)
md5: 33d1eb5306efa218b12ac27bd1f6e4cc
Type "25" into Amount (USD), choose "Weekly", select "Friday" as Day of week, click "Continue", and verify the review step lists "25", "Weekly" and "Friday".

## Confirm ✓ passed (33.4s)
md5: 1b42ff093e34867b0d3432b50a76c8b2
Click "Confirm" and verify "$25.00 of BTC, weekly on Fridays" with the badge "Recurring buy active".

## Verify the next run ✓ passed (37.4s)
md5: 64b57779f60b1381026fbee58511a28c
Verify "Next buy" reads "Friday, September 18, 2026" and the Recurring buys list shows "$25.00 BTC · Weekly (Friday)" as "Active".
