---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign/signing-ceremony?reset=true
max_steps: 45
tags: [docusign, docs-productivity, wizard]
---

# DocuSigned 43.2: Signing ceremony completion

Catalog objective: open the signing link, adopt a signature and complete.
Key assertion: the envelope is completed and the PDF sealed.

## Agree to e-sign
Go to https://my-testing-repo-main.vercel.app/docusign/signing-ceremony?reset=true, check "I agree to use electronic records and signatures.", click "Continue", and verify the document "Mutual Non-Disclosure Agreement" with a yellow "Sign" field.

## Try to finish unsigned
Click "Finish" and verify "Sign the Signature field before finishing."

## Adopt a signature
Click the "Sign" field, keep the name "Demo User", click "Adopt and Sign", and verify the signature "Demo User" is placed and Date Signed reads "9/14/2026".

## Finish
Click "Finish" and verify "You're done signing" with status "Completed".

## Download the sealed PDF
Click "Download sealed PDF" and verify "Downloaded Mutual-NDA-completed.pdf" with "Certificate of Completion".
