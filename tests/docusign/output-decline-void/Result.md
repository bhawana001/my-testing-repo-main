---
test: ../decline-void_test.md
status: passed
started: 2026-09-13T18:42:22.917Z
duration_s: 140
session_id: c72ba2bc-241d-424d-a153-308f197ae982
---

# DocuSigned 43.4: Decline and void handling — Result

## Open decline ✓ passed (33.6s)
md5: f3ded7f47235b75b7d33f40d3570b678
Go to https://my-testing-repo-main.vercel.app/docusign/decline-void?reset=true as "Signer (Sam Lee)", click "Other actions ▾ Decline to sign", and verify a "Decline to sign" dialog.

## Decline without a reason ✓ passed (36.7s)
md5: 30f8f30354a0710813e33fea75388782
Click "Decline to sign" in the dialog and verify "A reason is required to decline."

## Decline with a reason ✓ passed (36.9s)
md5: 28f7e4496b5b8fb9ea8e3db796594bf0
Type "Payment terms changed" into the reason, click "Decline to sign", and verify "You declined to sign this document."

## Verify the sender side ✓ passed (30.5s)
md5: 77eefece8a5771ef53797a2ba14e4d18
Click "Sender (Demo User)" and verify the status badge "Declined", "Reason: Payment terms changed", and the inbox email "Sam Lee declined to sign Vendor-Agreement.pdf".
