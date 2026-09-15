---
test: ../delivery-slot-checkout_test.md
status: passed
started: 2026-09-13T10:37:32.864Z
duration_s: 79
session_id: 5f46fb6b-c696-40b8-8145-497f888a6640
---

# Instakart 7.3: Delivery slot checkout — Result

## Open the cart and proceed ✓ passed (3.19s)
md5: 0b39a4981c1ee3b68184201c378f3f47
Go to https://my-testing-repo-main.vercel.app/instacart/delivery-slot-checkout?reset=true, click "Proceed to checkout", and verify a "Choose a delivery window" card lists "Priority", "Standard" and "Tomorrow morning" options.

## Choose the priority slot ✓ passed (0.74s)
md5: cd1bb44b5ee5f505688c4f03322b5938
Click the "Priority" option ("Today, within 60 minutes (2:00–3:00 PM)") and verify the "Fees" row reads "$4.49" ($1.50 service fee + $2.99 priority fee) and the "Order total" reads "$21.74".

## Pay ✓ passed (1.85s)
md5: 46906c8087613984acd7de67ef8b4174
Click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify the window and fees ✓ passed (72s)
md5: 242c9178c7e95bb7c697d76ad6623119
Verify the confirmation's "Delivery window" row reads "Today, within 60 minutes (2:00–3:00 PM)" and its "Order total" row reads "$21.74".
