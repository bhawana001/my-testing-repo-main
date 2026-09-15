---
test: ../email-to-ticket_test.md
status: passed
started: 2026-09-13T13:42:21.816Z
duration_s: 97
session_id: e7288052-3b0c-46f7-969f-8e3b7acf2512
---

# Freshdeskly 33.1: Email to ticket conversion — Result

## Compose the email ✓ passed (19s)
md5: 1b3f142a2e34c406b5402d1d86b4a77d
Go to https://my-testing-repo-main.vercel.app/freshdesk/email-to-ticket?reset=true and verify the mail client shows From "Demo User <demo@evals.dev>" and To "support@acme.freshdeskly.test".

## Send ✓ passed (43s)
md5: ff1768e7c43c0b947875bef2768aeeea
Type "Refund not received for order A-7802" into Subject and "I returned the item two weeks ago." into Message, click "Send email", and verify "Auto-reply: ticket #2052 created."

## Verify the ticket ✓ passed (33s)
md5: 8ad87a4b6d59e2765870597e3d0556a7
Click "Helpdesk" and verify the ticket list shows "#2052" with subject "Refund not received for order A-7802", requester "Demo User <demo@evals.dev>", source "✉ Email" and status "Open".
