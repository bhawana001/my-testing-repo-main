---
mode: testing
url: https://my-testing-repo-main.vercel.app/klarna-clone-app/checkout?reset=true
max_steps: 55
tags: [klarna, payments, returns]
---

# Klarnah 14.4: Return adjusts instalments

Catalog objective: register a return and verify the remaining instalments are recalculated.
Key assertion: the schedule updates to the reduced amount.

## Place the order and open the app
Type "Priya Nair" into "Full name", type "4417" into "Last 4 of ID number", click "Continue with Klarnah", click "Confirm and pay $45.00 today", then click "Open it in the Klarnah app".

## Verify the schedule before the return
Verify "Order total" reads "$180.00", "Outstanding" reads "$135.00" and payments 2, 3 and 4 are each "$45.00".

## Register the return
Tick "Warm LED Bulbs (4 pack) — $60.00" in "Register a return", click "Register return", and verify a green banner reads "Return registered — your remaining payments have been recalculated."

## Verify the remaining instalments were reduced
Verify "Order total" now reads "$120.00", "Outstanding" reads "$75.00", a badge reads "Refund applied: $60.00", payment 1 is still "$45.00" and "Paid", and payments 2, 3 and 4 are each "$25.00".
