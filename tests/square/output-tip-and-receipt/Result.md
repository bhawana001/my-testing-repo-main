---
test: ../tip-and-receipt_test.md
status: passed
started: 2026-09-14T10:00:46.259Z
duration_s: 193
session_id: a66a2dbc-0172-44c4-9702-f3dbc319a369
---

# Squarely 12.3: Tip and receipt screen — Result

## Open the POS ✓ passed (36.4s)
md5: e76d09e669129d5d4a85ae547edd9468
Go to https://my-testing-repo-main.vercel.app/square/tip-and-receipt?reset=true and verify the register shows "Subtotal" of "$24.00" and the question "Add a tip?" with 15%, 20%, 25% and "No tip" options.

## Choose a 20% tip ✓ passed (40.1s)
md5: 37ac9e6464423dc45c684b2b7497dd28
Click the "20%" tip option and verify "Tip" reads "$4.80" and "Total" reads "$28.80".

## Charge ✓ passed (56.1s)
md5: 695709d7a028e0823f6f77d7d8c0c643
Click "Charge $28.80" and verify the message "Payment of $28.80 approved (includes $4.80 tip)" and the question "How would you like your receipt?" with "Email", "Text message" and "No receipt" options.

## Choose an email receipt ✓ passed (57.8s)
md5: 475e843f4c3b0f1ad5bd42706f9574aa
Click "Email" and verify the completion screen shows "Total charged" of "$28.80", "Tip" of "$4.80" and "Receipt" reading "Emailed to demo@evals.dev".
