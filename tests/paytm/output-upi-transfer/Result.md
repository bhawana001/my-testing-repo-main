---
test: ../upi-transfer_test.md
status: passed
started: 2026-09-12T07:05:46.008Z
duration_s: 253
session_id: e00a9cb3-4931-4d49-ae3c-a1eebad78093
---

# Paytum 20.1: UPI money transfer — Result

## Open send money ✓ passed (44.1s)
md5: 7a73e2633ce76d0d80867b78c00b3634
Go to https://my-testing-repo-main.vercel.app/paytm/upi-transfer?reset=true and verify the "Send money · UPI" screen with UPI ID, Amount and note fields, and History showing one entry "Paid to ravi@okaxis".

## Enter an invalid UPI ID ✓ passed (48.5s)
md5: 3d253a9841e932f2370ce5db0d75c1a1
Type "asha" into "Enter UPI ID", "500" into Amount, click "Proceed to pay", and verify the error "Enter a valid UPI ID like name@bank." is shown.

## Enter valid details ✓ passed (49.6s)
md5: 49edfdc9c3995bee0995a9d36afb182f
Clear the UPI ID field, type "asha@okhdfc", type "Lunch" into "Add a note", click "Proceed to pay", and verify a "UPI PIN" field appears.

## Pay with the PIN ✓ passed (55.2s)
md5: 738a6197139a32e1454e5f4f7231c155
Type "1234" into "Enter UPI PIN", click "Pay ₹500.00", and verify "Payment successful" with "Paid to" reading "asha@okhdfc", "Amount" "₹500.00" and "Note" "Lunch".

## Verify history ✓ passed (51.8s)
md5: a6ddae71093c9127227632ac2c70e202
Verify the History list now shows at the top "Paid to asha@okhdfc · Lunch" with "−₹500.00".
