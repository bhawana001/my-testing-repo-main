---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen-clone-app/checkout?reset=true
max_steps: 45
tags: [adyen, payments, webhooks]
---

# Adyeen 13.4: Webhook status parity

Catalog objective: after a payment, verify the merchant order page shows the authorised status.
Key assertion: the UI status equals the notification status.

## Take a payment
Type nothing yet — first choose "Card", type "4111 1111 1111 1111" into "Card number", "03 / 30" into "Expiry", "737" into "CVC", and click "Pay €129.50".

## Verify the shopper result
Verify a green banner titled "Payment authorised" shows "Result code" of "Authorised" and "PSP reference" of "PSP883000001717".

## Open the merchant order page
Click "View the merchant order page" and verify "Order reference" reads "ORD-55120", "Status shown to merchant" reads "Authorised" and "PSP reference" reads "PSP883000001717".

## Verify the notification agrees
Verify the webhook list shows "AUTHORISATION · ORD-55120" with "success: true", and the parity card reads "UI status" of "Authorised", "Notification status" of "Authorised" and a badge saying "UI status matches the notification".
