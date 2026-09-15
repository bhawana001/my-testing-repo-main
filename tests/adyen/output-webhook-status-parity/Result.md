---
test: ../webhook-status-parity_test.md
status: passed
started: 2026-09-13T11:17:59.344Z
duration_s: 106
session_id: 07a72f01-5dc0-4406-b20b-06cf031d4d31
---

# Adyenly 13.4: Payment status webhook parity — Result

## Open the order ✓ passed (21.5s)
md5: 2031ada70d89bcec905d2f971257da94
Go to https://my-testing-repo-main.vercel.app/adyen/webhook-status-parity?reset=true and verify order "NH-ORDER-5521" shows Payment status "Awaiting payment" and "No notifications yet."

## Pay ✓ passed (31.5s)
md5: 0967d5f7800e4f8f46fa040375a598e7
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Pay €210.00", and wait until the webhook log shows a notification.

## Verify parity ✓ passed (51.1s)
md5: ecf32eb486999caf6befcabb52db17a9
Verify the notification shows "eventCode": "AUTHORISATION" and "success": "true", the order page Payment status reads "Authorised", and the badge reads "In sync ✓ · UI status “Authorised” = notification AUTHORISATION success=true".
