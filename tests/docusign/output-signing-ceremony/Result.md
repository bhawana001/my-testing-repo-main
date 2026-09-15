---
test: ../signing-ceremony_test.md
status: passed
started: 2026-09-13T10:00:08.991Z
duration_s: 180
session_id: 783a1158-a6ce-498a-bf2a-539fce2384b4
---

# DocuSigned 43.2: Signing ceremony completion — Result

## Agree to e-sign ✓ passed (37.2s)
md5: 32d344d2603d8a5fca58f319580df661
Go to https://my-testing-repo-main.vercel.app/docusign/signing-ceremony?reset=true, check "I agree to use electronic records and signatures.", click "Continue", and verify the document "Mutual Non-Disclosure Agreement" with a yellow "Sign" field.

## Try to finish unsigned ✓ passed (26.7s)
md5: 60f4c9703f78cdfc0fe80cb1a8e248ea
Click "Finish" and verify "Sign the Signature field before finishing."

## Adopt a signature ✓ passed (50.9s)
md5: 7a381aa9b8bf04ead8bff32c75f0de2a
Click the "Sign" field, keep the name "Demo User", click "Adopt and Sign", and verify the signature "Demo User" is placed and Date Signed reads "9/14/2026".

## Finish ✓ passed (34.1s)
md5: b14fe2c92758033dd4f150b4f6ee4701
Click "Finish" and verify "You're done signing" with status "Completed".

## Download the sealed PDF ✓ passed (29.6s)
md5: 32de70e0c422e13b52102ab7dd264e18
Click "Download sealed PDF" and verify "Downloaded Mutual-NDA-completed.pdf" with "Certificate of Completion".
