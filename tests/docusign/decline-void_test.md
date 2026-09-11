---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign/decline-void?reset=true
max_steps: 45
tags: [docusign, docs-productivity, tracker]
---

# DocuSigned 43.4: Decline and void handling

Catalog objective: decline as the signer and verify the sender notification.
Key assertion: the envelope status shows declined with the reason.

## Open decline
Go to https://my-testing-repo-main.vercel.app/docusign/decline-void?reset=true as "Signer (Sam Lee)", click "Other actions ▾ Decline to sign", and verify a "Decline to sign" dialog.

## Decline without a reason
Click "Decline to sign" in the dialog and verify "A reason is required to decline."

## Decline with a reason
Type "Payment terms changed" into the reason, click "Decline to sign", and verify "You declined to sign this document."

## Verify the sender side
Click "Sender (Demo User)" and verify the status badge "Declined", "Reason: Payment terms changed", and the inbox email "Sam Lee declined to sign Vendor-Agreement.pdf".
