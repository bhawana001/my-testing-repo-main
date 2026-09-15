---
test: ../replacement-preferences_test.md
status: passed
started: 2026-09-13T10:36:00.421Z
duration_s: 74
session_id: 5b7987b7-7331-4610-86e7-09bf2f8ef1a8
---

# Instakart 7.2: Replacement preferences — Result

## Open the cart ✓ passed (24.1s)
md5: c2e8028e2164b9d57e98bf65aa1750eb
Go to https://my-testing-repo-main.vercel.app/instacart/replacement-preferences?reset=true and verify "Organic Strawberries 1 lb" is marked "Often out of stock" with "If out of stock:" set to "Best match (shopper picks)".

## Set a specific replacement ✓ passed (19.1s)
md5: 6ed2dcbcea16a7dd747f222fdeda8e58
Select "Specific replacement: Berry Farms Strawberries 1 lb" in the strawberries' "If out of stock" dropdown.

## Verify after reload ✓ passed (29.4s)
md5: fa5b745bb45e58a323dfc1a38656118b
Reload the page without the reset parameter, click "Item details" under the strawberries, and verify the detail shows "If out of stock" as "Specific replacement: Berry Farms Strawberries 1 lb".
