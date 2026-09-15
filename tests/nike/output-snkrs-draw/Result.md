---
test: ../snkrs-draw_test.md
status: passed
started: 2026-09-13T10:44:24.980Z
duration_s: 193
session_id: d212ec67-11ac-4790-801c-104a12da8966
---

# Nyke 8.3: SNKRZ draw entry — Result

## Open the launch ✓ passed (23.1s)
md5: 05cf925abeef4534b10072b40be604ec
Go to https://my-testing-repo-main.vercel.app/nike/snkrs-draw?reset=true and verify "Air Stride '26 “Volt”" with the badge "Draw · Launches Sep 18" and an "Enter Draw" button.

## Enter without a size ✓ passed (25.7s)
md5: 3c14088d83d25923fc43b18c68739e49
Click "Enter Draw" and verify "Select a size to enter the draw."

## Pick a size and open confirmation ✓ passed (32.6s)
md5: abc20e6660ec78199ecc6700bfe6700a
Click "US 10", click "Enter Draw", and verify a "Confirm your entry" dialog showing Size "US 10" and "Visa •••• 4242".

## Submit the entry ✓ passed (60s)
md5: aaf9b01e602a22cb775d01cc281fe9d0
Click "Submit entry" and verify "You're in the draw" with Size "US 10".

## Verify after reload ✓ passed (50.2s)
md5: 716be45d7c7e1d8c83d9fb9bbd6a1a0a
Reload the page without the reset parameter and verify "You're in the draw" is still shown and the button reads "Entered" and is disabled.
