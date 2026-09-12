---
test: ../tip-adjustment_test.md
status: passed
started: 2026-09-11T16:48:24.540Z
duration_s: 312
session_id: 33f9c9f4-ac1d-4709-8321-d456b16b4e45
---

# Instakart 7.4: Tip adjustment — Result

## Check out with the default tip ✓ passed (99.5s)
md5: 8f3715fa399c3a48c5707e772ef9f59f
Go to https://my-testing-repo-main.vercel.app/instacart/tip-adjustment?reset=true, click "Proceed to checkout", click "Continue to payment", and verify the "Add a tip for your shopper" card has "$2.00" selected and the "Order total" reads "$19.46".

## Pay ✓ passed (73.1s)
md5: 55aeefd0ca134a414de9f90309928717
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify the confirmation shows "Order total" as "$19.46".

## Adjust the tip on the order page ✓ passed (38.1s)
md5: 4ae2ef740d07a5a884e8d43f3d25d5ac
In the "Shopper tip" card, click "$5.00" and verify "Tip included: $5.00" is shown.

## Verify the updated total ✓ passed (97.6s)
md5: 55faf6094f9d68bc510ffa5c47d2ec34
Verify the "Updated order total" reads "$22.46" ($19.46 − $2.00 + $5.00).
