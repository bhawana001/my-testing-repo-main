---
test: ../membership-upsell_test.md
status: passed
started: 2026-09-15T09:59:50.856Z
duration_s: 158
session_id: b208f48d-4744-4992-97d1-80b870947ead
---

# Wallmark 4.3: Membership upsell — Result

## Add an item and open checkout ✓ passed (43.5s)
md5: 9af6b6dbab7427b8cc54bc1d8096b985
Click "Add to cart" on "Large Eggs, 12 ct", click "Continue to checkout", and verify the checkout page shows a "Pickup time" section.

## Trigger the upsell with a paid express slot ✓ passed (40s)
md5: 9705338a67f954e80531ec6413f428b0
Click "Tomorrow, 12pm – 1pm · Express" and verify a dialog appears titled "Save on this order with Wallmark+".

## Confirm plan pricing renders ✓ passed (30s)
md5: e6732dac46d43a1831e0bcf9783aab02
Verify the dialog shows "Annual — $98.00/year" and "Monthly — $12.95/month".

## Close the modal cleanly ✓ passed (40.5s)
md5: 0638cfee5acba716d26f5f17850a6178
Click "No thanks" and verify the dialog is no longer shown and the checkout page still shows the "Order summary" with a "Place order" button.
