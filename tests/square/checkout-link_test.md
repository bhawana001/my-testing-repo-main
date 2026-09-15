---
mode: testing
url: https://my-testing-repo-main.vercel.app/square-clone-app/link?reset=true
max_steps: 40
tags: [square, payments, checkout]
---

# Squair 12.1: Checkout link

Catalog objective: complete a Squair checkout link with a test card.
Key assertion: the receipt page shows the correct amount.

## Verify the checkout link
Verify the page shows "KilnAndClay Studio" with the checkout link "chk_7K21", the item "Pottery workshop — single seat" and an amount of "$65.00".

## Fill in the details
Type "sam@riverfield.test" into "Email for receipt" and "4242 4242 4242 4242" into "Card number".

## Pay
Click "Pay $65.00" and verify a green banner titled "Payment complete" says the payment of "$65.00" was received.

## Verify the receipt
Verify the receipt shows "Payment ID" of "pay_8813", "Item" of "Pottery workshop — single seat", "Total paid" of "$65.00" and "Receipt sent to" of "sam@riverfield.test".
