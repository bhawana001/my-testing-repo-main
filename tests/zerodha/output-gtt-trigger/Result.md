---
test: ../gtt-trigger_test.md
status: passed
started: 2026-09-13T11:49:27.641Z
duration_s: 123
session_id: a36147c2-fa2b-4bc4-9a67-d0a617955126
---

# Zerodhi 17.2: GTT trigger creation — Result

## Open GTT ✓ passed (23.8s)
md5: ca5e18cf461e7b57369c301324cfa0f5
Go to https://my-testing-repo-main.vercel.app/zerodha/gtt-trigger?reset=true and verify the "Create GTT" form with instrument "RELX · LTP 2912.50" and an empty GTT list.

## Trigger above LTP ✓ passed (35.9s)
md5: 17d57c6ad7cc8d914f57e39b24c1395d
Type "2950" into Trigger price and "2955" into Limit price, click "Place GTT", and verify the error "For a BUY GTT the trigger must be below the LTP (2912.50)."

## Valid trigger ✓ passed (38.6s)
md5: 507ae4438b05217e37156911f11d9cef
Change Trigger price to 2850 and Limit price to 2855, click "Place GTT", and verify a new row appears in the GTT list.

## Verify the GTT values ✓ passed (23.1s)
md5: 7f1d7cf1cf467dd687bc22122f44b39f
Verify the row shows ID "GTT1044", instrument "RELX", type "Single · BUY", trigger "2850.00", limit "2855.00", qty "2" and status "Active".
