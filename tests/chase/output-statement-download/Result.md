---
test: ../statement-download_test.md
status: passed
started: 2026-09-13T12:16:37.504Z
duration_s: 97
session_id: b600aa56-07ba-4b1e-ab29-af79c0dfe4af
---

# Chaise Bank 23.4: Statement download — Result

## Open statements ✓ passed (32.6s)
md5: a0d6cabf34f6bc0c1577a8db6fbb0c66
Go to https://my-testing-repo-main.vercel.app/chase/statement-download?reset=true and verify the statements table lists "August 2026" marked "Last month", "July 2026" and "June 2026", each with a "Download PDF" button, and the "Download status" panel says "No downloads yet."

## Download last month ✓ passed (40.3s)
md5: 44d831f33217fa88ce65893e3beec2cc
Click the "Download PDF" button on the "August 2026" row and verify the Download status panel shows "Downloaded chaise-statement-2026-08.pdf".

## Verify the file is non-empty ✓ passed (22.3s)
md5: 626b58fb45ef8dde1ba1c164dc98e50f
Verify the Download status message includes a size in KB greater than zero (it reads "1.8 KB, 1855 bytes") and the sentence "The file is a valid, non-empty PDF.", and the list below shows "chaise-statement-2026-08.pdf · 1855 bytes".
