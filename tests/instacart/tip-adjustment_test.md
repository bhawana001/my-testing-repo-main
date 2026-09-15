---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart-clone-app?reset=true
max_steps: 50
tags: [instacart, grocery, tip]
---

# Instacrate 7.4: Tip adjustment

Catalog objective: adjust the tip after checkout from the order page.
Key assertion: the updated tip is reflected in the order total.

## Place an order first
Click "Add" on "Oat Milk, 64 oz", click "Go to checkout", click "Within 2 hours · 3:00pm – 5:00pm", type "4242 4242 4242 4242" into the card number field, click "$5.00" for the tip, then click "Place order" and verify the confirmation shows "Order placed".

## Open the order
Click "View order & adjust tip" and verify the orders page shows a tip of "$5.00".

## Open the tip editor
Click "Adjust tip" and verify a custom tip field appears.

## Raise the tip
Click "$8.00" and verify a notice appears reading "Tip updated to $8.00".

## Confirm the total moved with the tip
Verify the order now shows a tip of "$8.00" and a badge reading "Tip adjusted after delivery".
