---
test: ../electricity-bill_test.md
status: passed
started: 2026-09-12T07:13:46.365Z
duration_s: 197
session_id: 883b73a3-ab49-4fd9-9052-f15e8f6e0571
---

# Paytum 20.3: Bill payment electricity — Result

## Try an unknown consumer number ✓ passed (33.8s)
md5: 7473afb57f695c4f717836d1cc6fa3b0
Go to https://my-testing-repo-main.vercel.app/paytm/electricity-bill?reset=true, type "1111111111" into "Consumer number", click "Fetch bill", and verify the message "No pending bill found for this consumer number." is shown.

## Fetch the demo bill ✓ passed (90.4s)
md5: e9ce3e3d56c24eff58c9aa3e2b4e8427
Clear the Consumer number field, type "1002003004", click "Fetch bill", and verify the "Bill fetched" card shows "Demo User · 1002003004", due date "20 Sep 2026" and "Bill amount" "₹1,842.00".

## Pay ✓ passed (39.5s)
md5: e9931ec8487690ba7df4460f7932151a
Click "Pay ₹1,842.00" and verify "Bill paid" is shown.

## Verify amounts match ✓ passed (30.8s)
md5: a939934bc9a886912e6c4c0c7122ea95
Verify "Fetched amount" reads "₹1,842.00" and "Amount paid" reads "₹1,842.00".
