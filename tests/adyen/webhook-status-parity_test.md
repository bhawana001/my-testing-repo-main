---
mode: testing
url: https://my-testing-repo-main.vercel.app/adyen/webhook-status-parity?reset=true
max_steps: 45
tags: [adyen, payments-infra, tracker]
---

# Adyenly 13.4: Payment status webhook parity

Catalog objective: after payment, verify the merchant order page shows the authorised status.
Key assertion: the UI status equals the notification status.

## Open the order
Go to https://my-testing-repo-main.vercel.app/adyen/webhook-status-parity?reset=true and verify order "NH-ORDER-5521" shows Payment status "Awaiting payment" and "No notifications yet."

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Pay €210.00", and wait until the webhook log shows a notification.

## Verify parity
Verify the notification shows "eventCode": "AUTHORISATION" and "success": "true", the order page Payment status reads "Authorised", and the badge reads "In sync ✓ · UI status “Authorised” = notification AUTHORISATION success=true".
