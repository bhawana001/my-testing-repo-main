---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign-clone-app/send?reset=true
max_steps: 55
tags: [docusign, documents, esign]
---

# DocuSine 43.4: Decline and void

Catalog objective: decline as the signer and verify the sender notification.
Key assertion: the envelope status shows declined with a reason.

## Send an envelope
Type "Please sign: Service agreement" into "Subject", click "Signature" to add a field, type "Sam Rivera" into "Name", "sam@riverfield.test" into "Email", and click "Send for signature".

## Open the signing link
Click through to the signing page and verify the envelope "ENV-7742" is shown for signing.

## Decline to sign
Click "Decline to sign", verify a dialog titled "Decline to sign" opens, choose the reason "The terms need to change", and click "Decline".

## Verify the sender is notified with the reason
Verify a red banner titled "You declined to sign" says the sender has been notified that "ENV-7742" was declined, with "Status" of "declined" and "Reason" of "The terms need to change", and verify the envelope list at https://my-testing-repo-main.vercel.app/docusign-clone-app shows that envelope as declined with the same reason.
