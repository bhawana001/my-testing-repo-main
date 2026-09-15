---
test: ../member-exclusive_test.md
status: passed
started: 2026-09-13T10:41:31.207Z
duration_s: 157
session_id: 6abcbc3a-dabd-4b3c-bf68-0335a6415177
---

# Nyke 8.2: Member exclusive access — Result

## Open as a guest ✓ passed (17.4s)
md5: 3e4dd8431263adce730e3f6b6514dc5d
Go to https://my-testing-repo-main.vercel.app/nike/member-exclusive?reset=true and verify the product "Stride Runner 3 · Member Edition" shows the notice "This product is only available to Nyke Members" and the "Members only" button is disabled.

## Sign in ✓ passed (56.1s)
md5: 1e240d05a1ff59cba35a5b68dc7f1fa7
Click "Sign in to unlock", type "demo@evals.dev" into Email and "Demo123!" into Password, click "Sign in", and verify the top bar shows the badge "Member · Demo".

## Verify access ✓ passed (30.9s)
md5: 3624a3ce16ce8d523bcbbce0ae29b8bd
Verify the members-only notice is gone, size chips "US 8", "US 9" and "US 10" are shown, and the button now reads "Add to Bag".

## Choose a size ✓ passed (27s)
md5: a7a8c18ac7e4280a0fd133a854a7724a
Click "US 9" and verify the "Add to Bag" button is enabled.

## Add to bag ✓ passed (23.5s)
md5: 5f2c30f3b6a85492b54460f354d240ca
Click "Add to Bag" and verify the message "Added Stride Runner 3 · Member Edition (US 9) to your bag." appears.
