---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign-clone-app/send?reset=true
max_steps: 55
tags: [docusign, documents, esign]
---

# DocuSine 43.2: Signing ceremony

Catalog objective: open the signing link, adopt a signature and complete.
Key assertion: the envelope is completed and the PDF sealed.

## Send an envelope first
Type "Please sign: Service agreement" into "Subject", click "Signature" and "Date signed" to add fields, type "Sam Rivera" into "Name", "sam@riverfield.test" into "Email", and click "Send for signature".

## Open the signing link
Click through to the signing page and verify the page title reads "Please sign: Service agreement" with the subtitle naming envelope "ENV-7742".

## Adopt a signature
Click "Adopt and sign", type "Sam Rivera" into "Full name" in the dialog, and click the adopt button, then verify the signature field now carries "Sam Rivera".

## Complete and verify the sealed document
Fill in the date field, click "Finish", and verify a green banner titled "You're done" says envelope "ENV-7742" is completed and a sealed PDF has been sent, with "Status" reading "completed".
