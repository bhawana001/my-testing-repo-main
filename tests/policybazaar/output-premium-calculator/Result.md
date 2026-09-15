---
test: ../premium-calculator_test.md
status: passed
started: 2026-09-13T12:55:51.228Z
duration_s: 130
session_id: ff28cca8-53c7-4827-9b95-b6dff3be78f1
---

# PolicyMart 27.4: Premium calculator — Result

## Open the calculator ✓ passed (19.8s)
md5: 28082b7b1e64e0a5c1309ac20f3d650b
Go to https://my-testing-repo-main.vercel.app/policybazaar/premium-calculator?reset=true and verify age "30", cover "₹1Cr" and the premium "₹1,425.00" per year.

## Increase age ✓ passed (27.7s)
md5: 019a673bc5a8f061fcafa8ed41e58b3e
Click "+ Age" and verify the age reads "31" and the premium reads "₹1,475.00".

## Increase cover ✓ passed (56.9s)
md5: c20bed5d14bb5240ca6c8861137dd501
Click "₹2Cr" and verify the premium reads "₹2,950.00" and "Cover" reads "₹2,00,00,000.00".

## Verify the recalculation log ✓ passed (23.5s)
md5: 7f697031c8ae31f02910d0bebd5717d7
Verify "Recent recalculations" lists "Age 31, cover ₹100L → ₹1,475.00" and "Age 31, cover ₹200L → ₹2,950.00".
