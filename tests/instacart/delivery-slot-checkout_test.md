---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart-clone-app?reset=true
max_steps: 45
tags: [instacart, grocery, checkout]
---

# Instacrate 7.3: Delivery slot checkout

Catalog objective: choose a priority slot and complete checkout with a test card.
Key assertion: confirmation shows the chosen window and fees.

## Add an item and open checkout
Click "Add" on "Organic Strawberries, 1 lb", click "Go to checkout", and verify the checkout page shows "GreenLeaf Market".

## Choose the priority slot
Click "Priority — within 1 hour · 2:00pm – 3:00pm" and verify the store card shows a priority fee of "$4.99".

## Pay with the test card
Type "4242 4242 4242 4242" into the card number field, click "$5.00" for the tip, and verify the order total shows "$23.84".

## Place the order
Click "Place order" and verify the confirmation shows "Order placed" with an order number starting with "IC-".

## Confirm the window and fees carried through
Verify the confirmation shows a delivery window of "Priority — within 1 hour · 2:00pm – 3:00pm", a service fee of "$3.99" and a priority fee of "$4.99".
