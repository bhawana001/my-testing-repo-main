---
mode: testing
url: https://my-testing-repo-main.vercel.app/square-clone-app/pos?reset=true
max_steps: 45
tags: [square, payments, pos]
---

# Squair 12.3: Tip and receipt

Catalog objective: complete a payment with a tip selection on the web POS.
Key assertion: the total includes the tip and a receipt is offered.

## Ring up a sale
Click "Oat Latte" and "Cardamom Bun" in the items list and verify the sale shows "Subtotal" of "$9.75".

## Go to the tip screen
Click the charge button and verify a "Add a tip?" screen appears showing "Subtotal" of "$9.75".

## Choose a tip
Click the "20%" tip option and verify "Tip" reads "$1.95" and "Total" reads "$11.70".

## Charge and verify the receipt is offered
Click "Charge $11.70" and verify a green banner says "$11.70" was charged including a tip of "$1.95", with a "Send a receipt?" card showing "Payment ID" of "pay_8813", "Tip" of "$1.95" and "Total" of "$11.70".
