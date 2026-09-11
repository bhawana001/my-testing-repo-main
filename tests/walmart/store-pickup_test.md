---
mode: testing
url: https://my-testing-repo-main.vercel.app/walmart/store-pickup?reset=true
max_steps: 40
tags: [walmart, e-commerce, checkout]
---

# Walmartly 4.1: Store pickup selection

Catalog objective: add an item, choose free pickup at a nearby store, reach checkout.
Key assertion: the pickup store and time slot are shown in the order summary.

## Open the cart and proceed
Go to https://my-testing-repo-main.vercel.app/walmart/store-pickup?reset=true, verify the cart contains "Vista 55\" 4K TV" at "$449.00", then click "Proceed to checkout" and verify the card "How do you want to get your order?" is shown.

## Choose free pickup
Click the "Free pickup" option and verify a "Store" dropdown showing "Walmartly Supercenter, Market St · 1.2 mi" and "Pickup time" slots appear.

## Try continuing without a slot
Click "Continue to payment" and verify the message "Choose a pickup time." is shown.

## Pick a slot and continue
Click the "Today 6:00–7:00 PM" slot, click "Continue to payment", and verify the order summary shows "Pickup: Walmartly Supercenter, Market St · Today 6:00–7:00 PM" and the "Shipping" row reads "Free".

## Pay and verify the summary
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify the confirmation lists "Pickup store" as "Walmartly Supercenter, Market St" and "Pickup time" as "Today 6:00–7:00 PM".
