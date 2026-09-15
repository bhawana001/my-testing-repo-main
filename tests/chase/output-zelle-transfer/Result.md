---
test: ../zelle-transfer_test.md
status: passed
started: 2026-09-14T10:27:45.111Z
duration_s: 186
session_id: 4ca81168-87e5-4616-9689-1aad91f0c803
---

# Chaise Bank 23.2: Zelly transfer — Result

## Open Zelly ✓ passed (28.4s)
md5: 71c9518e15fa01edf1addd3e8035a44b
Go to https://my-testing-repo-main.vercel.app/chase/zelle-transfer?reset=true and verify the "Total Checking" card shows "$4,210.55" and the wizard step "Send money with Zelly" lists the contacts "Priya Nair" and "Tom Alvarez".

## Pick the recipient and amount ✓ passed (82.8s)
md5: 622c7f1d52eb455d85e09027a4c5c4cd
Choose "Priya Nair", click "Continue", type "45" into Amount and "Dinner" into Memo, click "Continue", and verify the review step lists "Priya Nair", "45" and "Dinner".

## Send ✓ passed (32.9s)
md5: db2e88c6684b589f85ece66f52212099
Click "Send money" and verify the confirmation "You sent $45.00 to Priya Nair" with the badge "Sent".

## Verify the reference and balance ✓ passed (39.3s)
md5: 71f3ac9bd2b3e751a7eb75e811bc2666
Verify a "Reference number" starting with "ZL-" is shown and the "Total Checking" balance now reads "$4,165.55".
