---
test: ../request-and-remind_test.md
status: passed
started: 2026-09-12T11:39:27.024Z
duration_s: 3520
session_id: 5e205872-cdeb-46dd-ba6f-ff6ddf04d40c
---

# Venmoo 22.2: Request and remind — Result

## Create a request ✓ passed (178.1s)
md5: d2aa59c19e064641e6198c2a4d5dd6fa
Go to https://my-testing-repo-main.vercel.app/venmo/request-and-remind?reset=true, type "30" into Amount and "Dinner" into Note, click "Request", and verify an outgoing request "Priya Nair · $30.00 · Dinner" appears with status "Pending" and "No reminder sent".

## Remind ✓ passed (132.8s)
md5: 1f6bd3cdae20bb8159c73d67149aa040
Click "Remind" on that request.

## Verify the reminder state ✓ passed (74.3s)
md5: c9e784495ff31f19249f1e2caf89b4c4
Verify the request still shows status "Pending" and the reminder line reads "Reminder sent (1) · Just now".
