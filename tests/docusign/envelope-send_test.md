---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign/envelope-send?reset=true
max_steps: 45
tags: [docusign, docs-productivity, wizard]
---

# DocuSigned 43.1: Envelope send for signature

Catalog objective: send a document for signature with two fields.
Key assertion: the recipient receives a signing link.

## Add the document
Go to https://my-testing-repo-main.vercel.app/docusign/envelope-send?reset=true, click "+ Add sample Mutual-NDA.pdf", and verify "Mutual-NDA.pdf · 2 pages" is added.

## Add the recipient
Click "Continue", type "Sam Lee" into Recipient name and "sam@acme.test" into Recipient email, click "Continue", and verify the "Place fields on page 2" step.

## Try without a signature field
Click "Continue" and verify "Place a Signature field for the signer."

## Place two fields
Tick "Signature" and "Date Signed", click "Continue", and verify the "Email subject and message" step with subject "Please DocuSign: Mutual-NDA.pdf".

## Send
Click "Continue", then click "Send", and verify "Your envelope was sent" with status "Sent" and fields "Signature, Date Signed".

## Verify the recipient's signing link
Verify the recipient inbox for sam@acme.test shows "Please DocuSign: Mutual-NDA.pdf" with a "Review document" link.
