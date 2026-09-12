---
test: ../wallet-to-bank_test.md
status: passed
started: 2026-09-12T07:17:20.933Z
duration_s: 143
session_id: 9e01775e-7367-421b-98bd-10c790446ddc
---

# Paytum 20.4: Wallet to bank transfer — Result

## Open the wallet ✓ passed (39.5s)
md5: 2ec321fdada89ed1f2d903715a235f6c
Go to https://my-testing-repo-main.vercel.app/paytm/wallet-to-bank?reset=true and verify the wallet balance reads "₹3,250.00" and the linked bank is "HDFB Bank •••• 7712".

## Try more than the balance ✓ passed (30.4s)
md5: 30b3d32c38c348e3b2bb58ce05314c6c
Type "5000" into "Amount (₹)", click "Transfer to bank", and verify the error "Amount exceeds your wallet balance." is shown.

## Transfer ✓ passed (30.6s)
md5: 4e2ded4b91810f01fda2ad6071aa93fe
Clear the amount, type "1000", click "Transfer to bank", and verify the message "₹1,000.00 transfer initiated to HDFB Bank •••• 7712" appears.

## Verify debit and state ✓ passed (39.3s)
md5: 417145af6ca04a8f076c057514f73940
Verify the wallet balance now reads "₹2,250.00" and the Transfers list shows "WB1000" for "₹1,000.00" with status "Initiated".
