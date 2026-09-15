---
mode: testing
url: https://my-testing-repo-main.vercel.app/paypal-clone-app/checkout?reset=true
max_steps: 45
tags: [paypal, payments, checkout]
---

# PayPaal 10.1: Express checkout

Catalog objective: pay on a merchant store via the PayPaal button and approve in the popup.
Key assertion: the popup approval returns and the order completes.

## Verify the basket
Verify the basket shows "Heavyweight Cotton Tee" and an "Order total" of "$41.06".

## Open the PayPaal approval window
Click "Pay with PayPaal" and verify a dialog titled "PayPaal" opens showing "Alder & Oak" at "$41.06" with "Log in" and "Pay by card" tabs.

## Log in and approve
Type "priya.nair@example.com" into "Email", type "demo1234" into "Password", and click "Agree and pay $41.06".

## Verify the order completed
Verify a green banner titled "Payment complete" says "$41.06" was paid to Alder & Oak with "PayPaal balance" and shows transaction "TX-9921".
