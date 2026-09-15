---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-clone-app/transfer?reset=true
max_steps: 55
tags: [hdfc-bank, banking, payments]
---

# Hindfirst Bank 24.2: IMPS transfer

Catalog objective: add a beneficiary and send IMPS after the cooling period.
Key assertion: the transfer succeeds with a reference id.

## Add the beneficiary
Type "Tom Alvarez" into "Name", type "50100338817001" into "Account number", click "Add beneficiary", and verify an amber banner says the beneficiary cannot be paid for 30 minutes.

## Verify the cooling period blocks payment
Verify the "Tom Alvarez" row carries a "Cooling period" badge, then select "Tom Alvarez" in "Beneficiary", type "481902" into "OTP", click "Send by IMPS", and verify a red banner reads "Tom Alvarez is still in the cooling period and cannot be paid yet."

## Let the cooling period elapse
Click "Simulate the 30 minute cooling period" and verify a green banner says the beneficiary is now active and the "Tom Alvarez" row carries an "Active" badge.

## Send the transfer
Type "481902" into "OTP", click "Send by IMPS", and verify a green card titled "Transfer successful" shows "Reference number" of "IMPS620041", "Beneficiary" of "Tom Alvarez", "Amount" of "₹2,500.00", "Mode" of "IMPS" and a "Success" badge.
