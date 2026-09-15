---
test: ../envelope-send_test.md
status: failed
started: 2026-09-15T07:04:52.317Z
duration_s: 75
session_id: 4e10d778-42cc-4dbe-92a7-ef3453997208
---

# DocuSigned 43.1: Envelope send for signature — Result

## Add the document ✓ passed (6.51s)
md5: d6f71de34fd8347d1f9cc0385a32ecb9
Go to https://my-testing-repo-main.vercel.app/docusign/envelope-send?reset=true, click "+ Add sample Mutual-NDA.pdf", and verify "Mutual-NDA.pdf · 2 pages" is added.

## Add the recipient ✓ passed (1.61s)
md5: eea3c38b774f762e656ac52abe60d014
Click "Continue", type "Sam Lee" into Recipient name and "sam@acme.test" into Recipient email, click "Continue", and verify the "Place fields on page 2" step.

## Try without a signature field ✓ passed (6.95s)
md5: a2df8d8b7110e9ff9e2a65fccb6dda8d
Click "Continue" and verify "Place a Signature field for the signer."

## Place two fields ✓ passed (3.11s)
md5: 1883f04773d0b3289ede1f21f9a23f93
Tick "Signature" and "Date Signed", click "Continue", and verify the "Email subject and message" step with subject "Please DocuSign: Mutual-NDA.pdf".

## Send ✗ failed (55.3s)
md5: 2e62660edc6b7b50720a3faa14cde394
Reason: AP produced no action for 3 consecutive steps — bug verdict: Agent failed to finish after successful envelope send [automation_bug/agent_misstep, confidence 0.98]
Click "Continue", then click "Send", and verify "Your envelope was sent" with status "Sent" and fields "Signature, Date Signed".

## Verify the recipient's signing link ⏭ skipped
