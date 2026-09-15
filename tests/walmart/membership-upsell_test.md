---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart-clone-app?reset=true
max_steps: 45
tags: [walmart, membership, modal]
---

# Wallmark 4.3: Membership upsell

Catalog objective: trigger the Wallmark+ banner during checkout and open the signup modal.
Key assertion: plan pricing renders and the modal closes cleanly.

## Add an item and open checkout
Click "Add to cart" on "Large Eggs, 12 ct", click "Continue to checkout", and verify the checkout page shows a "Pickup time" section.

## Trigger the upsell with a paid express slot
Click "Tomorrow, 12pm – 1pm · Express" and verify a dialog appears titled "Save on this order with Wallmark+".

## Confirm plan pricing renders
Verify the dialog shows "Annual — $98.00/year" and "Monthly — $12.95/month".

## Close the modal cleanly
Click "No thanks" and verify the dialog is no longer shown and the checkout page still shows the "Order summary" with a "Place order" button.
