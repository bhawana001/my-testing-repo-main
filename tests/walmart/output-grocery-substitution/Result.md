---
test: ../grocery-substitution_test.md
status: passed
started: 2026-09-11T16:14:32.773Z
duration_s: 260
session_id: ecf2f03b-6c28-40a7-a8e0-f04790e68374
---

# Walmartly 4.2: Grocery substitution — Result

## Open the grocery cart ✓ passed (40.5s)
md5: 41f4720c6f7ede3aa96dd1b9cd09a198
Go to https://my-testing-repo-main.vercel.app/walmart/grocery-substitution?reset=true and verify the cart contains "Organic Whole Milk 1L", "Bananas (bunch)" and "Sourdough Loaf", each showing "No substitutions".

## Enable substitutions on the milk ✓ passed (62.3s)
md5: 2b914e8f69fa1ac9ad39cae891708030
Click the "Allow substitutions for Organic Whole Milk 1L" switch and verify the badge "Substitutions allowed" appears under the milk item only.

## Reload and check persistence ✓ passed (39.3s)
md5: c3552d8b3519136dfd46abe3b30b19c1
Reload the page without the reset parameter and verify the milk item still shows "Substitutions allowed".

## Check out ✓ passed (68.6s)
md5: 3b091b588817532c86c08c57949a8d6c
Click "Proceed to checkout", click "Continue to payment", type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify "Order placed" is shown.

## Verify the preference on the order ✓ passed (45.2s)
md5: eca276aecc05693464ae23f56f5eaa05
Verify the confirmation's item list shows "Substitutions allowed" under "Organic Whole Milk 1L" and "No substitutions" under "Sourdough Loaf".
