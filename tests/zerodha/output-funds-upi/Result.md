---
test: ../funds-upi_test.md
status: passed
started: 2026-09-13T11:53:33.199Z
duration_s: 110
session_id: b73b9bcc-4e52-4c88-9f6d-de3d461df62f
---

# Zerodhi 17.4: Funds transfer UPI — Result

## Open funds ✓ passed (22.3s)
md5: cd43402dc4a37f59dcf95ebe05701728
Go to https://my-testing-repo-main.vercel.app/zerodha/funds-upi?reset=true and verify "Available margin" reads "₹25,000.00".

## Start a UPI pay-in ✓ passed (32.3s)
md5: 8defa2b54ffd5a462c87b74fc73184b9
Type "5000" into Amount and "demo@okbank" into UPI ID, click "Continue", and verify a UPI collect window shows "Zerodhi Broking is requesting ₹5,000.00".

## Approve ✓ passed (25.9s)
md5: f35fca319d027973f92d7c4f453a7095
Click "Approve" and verify the message "₹5,000.00 added via UPI. Available margin ₹25,000.00 → ₹30,000.00."

## Verify margin ✓ passed (28.2s)
md5: 5c9c07031de32fca7f50fb2cdcfc8cee
Verify "Available margin" reads "₹30,000.00".
