---
test: ../widget-ticket_test.md
status: passed
started: 2026-09-13T09:57:43.066Z
duration_s: 129
session_id: 905d9438-b052-43e8-99a3-ab49035c4947
---

# Zendeskly 30.1: Ticket submission via widget — Result

## Open the widget ✓ passed (19.4s)
md5: 60b6e2ee7d35bdf21da3144d8d3be727
Go to https://my-testing-repo-main.vercel.app/zendesk/widget-ticket?reset=true, click the "? Help" button in the bottom-right corner, and verify a "Leave us a message" form opens.

## Submit with an invalid email ✓ passed (47.3s)
md5: 0c9d4f26b23f160149d70b957de73903
Type "Demo User" into Your name, "demo@evals" into Email address, "Cannot reset password" into Subject, "The reset email never arrives." into How can we help?, select "High" priority, click "Send", and verify the error "Enter a valid email address."

## Fix the email and send ✓ passed (36.2s)
md5: 53e4378cb9e0261679e44da202756640
Change Email address to "demo@evals.dev", click "Send", and verify "Thanks for reaching out" with "Your request #1043 was received."

## Verify the ticket fields ✓ passed (24.3s)
md5: 42e27ecbc9f931d5fdf284cb3b3f66b5
Click "Agent view" in the top bar and verify the ticket list shows "#1043" with subject "Cannot reset password", requester "Demo User (demo@evals.dev)", priority "High", status "New" and channel "Web widget".
