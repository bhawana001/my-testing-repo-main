---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/multi-store-cart?reset=true
max_steps: 40
tags: [instacart, e-commerce, checkout]
---

# Instakart 7.1: Multi-store cart

Catalog objective: add items from two stores and verify separate delivery slots.
Key assertion: each store cart has its own slot and fee.

## Open the carts
Go to https://my-testing-repo-main.vercel.app/instacart/multi-store-cart?reset=true and verify items from two stores are listed: "Organic Whole Milk 1L" and "Bananas (bunch)" sold by "Green Grocer", and "Vitamin D3 1000 IU (90)" sold by "Corner Pharmacy".

## Proceed and try to skip slots
Click "Proceed to checkout", then click "Continue to payment" and verify the message "Pick a slot for every store." is shown.

## Pick a slot per store
Click "Today 6pm–8pm" under "Green Grocer · delivery window" and "Tomorrow 10am–12pm" under "Corner Pharmacy · delivery window", and verify the summary shows "Green Grocer slot" as "Today 6pm–8pm", "Corner Pharmacy slot" as "Tomorrow 10am–12pm" and a "Fees" row of "$6.98" ($3.99 + $2.99).

## Pay
Click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify per-store slots and fees
Verify the confirmation lists "Green Grocer" as "Today 6pm–8pm · fee $3.99" and "Corner Pharmacy" as "Tomorrow 10am–12pm · fee $2.99".
