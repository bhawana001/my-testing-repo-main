---
mode: testing
url: https://my-testing-repo-main.vercel.app/hdfc-bank/imps-transfer?reset=true
max_steps: 40
tags: [hdfc-bank, banking, wizard]
---

# HDFB Bank 24.2: IMPS transfer

Catalog objective: add a beneficiary and send IMPS after a cooling-period simulation.
Key assertion: transfer success with a reference id.

## Open fund transfer
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/imps-transfer?reset=true and verify the "Savings Account" balance reads "₹1,84,250.40" and the Beneficiaries list shows "Meera Iyer" as "Active".

## Add a beneficiary
Type "Karan Shah" into Beneficiary name, "998877665544" into Account number and "HDFC0009988" into IFSC, click "Add beneficiary", and verify "Karan Shah" appears in the list with the badge "Cooling period · 30 min".

## Attempt IMPS during cooling
Select "Karan Shah · 5544 (cooling)" in "To beneficiary", type "2500" into Amount (INR), click "Continue", and verify the error "This beneficiary is in the 30-minute cooling period. IMPS is not allowed yet." is shown.

## Simulate the cooling period
Click "Simulate 30 min elapsed" next to Karan Shah and verify his badge reads "Active".

## Send with OTP
Click "Continue", type "123456" into the OTP field, click "Confirm transfer", and verify the message "Transfer successful" appears.

## Verify the reference and balance
Verify a "Reference ID" starting with "IMPS" is shown and the Savings Account balance now reads "₹1,81,750.40".
