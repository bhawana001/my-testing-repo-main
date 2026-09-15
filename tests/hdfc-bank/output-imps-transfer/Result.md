---
test: ../imps-transfer_test.md
status: passed
started: 2026-09-14T10:31:10.656Z
duration_s: 279
session_id: 84c3db16-ba54-4581-9738-ed3859c10103
---

# HDFB Bank 24.2: IMPS transfer — Result

## Open fund transfer ✓ passed (8.17s)
md5: 0c770c43c03cc0b441e6808bec66cbac
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/imps-transfer?reset=true and verify the "Savings Account" balance reads "₹1,84,250.40" and the Beneficiaries list shows "Meera Iyer" as "Active".

## Add a beneficiary ✓ passed (65.5s)
md5: def5f47452437c6e766b615118eba4e7
Type "Karan Shah" into Beneficiary name, "998877665544" into Account number and "HDFC0009988" into IFSC, click "Add beneficiary", and verify "Karan Shah" appears in the list with the badge "Cooling period · 30 min".

## Attempt IMPS during cooling ✓ passed (37.1s)
md5: f9cad130f89c58176222846af1a7a22f
Select "Karan Shah · 5544 (cooling)" in "To beneficiary", type "2500" into Amount (INR), click "Continue", and verify the error "This beneficiary is in the 30-minute cooling period. IMPS is not allowed yet." is shown.

## Simulate the cooling period ✓ passed (72.7s)
md5: 9e6b065478718e57fd1454df0aaa41c3
Click "Simulate 30 min elapsed" next to Karan Shah and verify his badge reads "Active".

## Send with OTP ✓ passed (54.8s)
md5: 135d93d3f78ca3f0746fbe3ed7bcc13b
Click "Continue", type "123456" into the OTP field, click "Confirm transfer", and verify the message "Transfer successful" appears.

## Verify the reference and balance ✓ passed (36.6s)
md5: 79d4c31c539674385fb47a4af7020eaf
Verify a "Reference ID" starting with "IMPS" is shown and the Savings Account balance now reads "₹1,81,750.40".
