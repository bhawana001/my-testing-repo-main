---
test: ../fd-creation_test.md
status: passed
started: 2026-09-13T12:26:28.764Z
duration_s: 182
session_id: 757b473d-9046-4f71-bf82-d52592360c41
---

# HDFB Bank 24.3: FD creation — Result

## Open the FD wizard ✓ passed (15.9s)
md5: 14c3a100b7a08fc3b2496a979fe2f3c2
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/fd-creation?reset=true and verify the step "Open a fixed deposit" with a "Deposit amount (INR)" field.

## Enter an amount below the minimum ✓ passed (35.4s)
md5: fdbb01d28af7013ce1240e124908d6ca
Type "1000" into Deposit amount (INR), click "Continue", and verify the validation message "Minimum ₹5,000, up to your available balance." is shown.

## Enter a valid amount and tenure ✓ passed (56.6s)
md5: 5f9cf0acc079f20991426d31634d1289
Clear the amount, type "100000", click "Continue", choose "12 months" (6.6% p.a.) and "Credit principal and interest to savings", click "Continue", and verify the review step lists "100000" and "12 months".

## Open the deposit ✓ passed (22.6s)
md5: 61a5c5fb14f49b93be3ff94b1ef0dc69
Click "Open deposit" and verify the "Fixed deposit receipt" with the badge "Deposit opened".

## Verify the receipt ✓ passed (49.7s)
md5: fdbc3df5d1f8d3e6c7328a32780d6fec
Verify "Principal" reads "₹1,00,000.00", "Tenure" reads "12 months at 6.6% p.a.", "Maturity date" reads "14 Sep 2027" and "Maturity amount" reads "₹1,06,765.15".
