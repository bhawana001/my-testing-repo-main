---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase/statement-download?reset=true
max_steps: 40
tags: [chase, banking, custom]
---

# Chaise Bank 23.4: Statement download

Catalog objective: download last month's statement PDF.
Key assertion: the PDF downloads and is non-empty.

## Open statements
Go to https://my-testing-repo-main.vercel.app/chase/statement-download?reset=true and verify the statements table lists "August 2026" marked "Last month", "July 2026" and "June 2026", each with a "Download PDF" button, and the "Download status" panel says "No downloads yet."

## Download last month
Click the "Download PDF" button on the "August 2026" row and verify the Download status panel shows "Downloaded chaise-statement-2026-08.pdf".

## Verify the file is non-empty
Verify the Download status message includes a size in KB greater than zero (it reads "1.8 KB, 1855 bytes") and the sentence "The file is a valid, non-empty PDF.", and the list below shows "chaise-statement-2026-08.pdf · 1855 bytes".
