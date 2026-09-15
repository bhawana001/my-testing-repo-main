---
test: ../workflow-form_test.md
status: passed
started: 2026-09-14T10:51:12.526Z
duration_s: 142
session_id: 27402158-32c3-4561-bdda-62b31b6dc6fa
---

# Slacky 35.5: Workflow form submission — Result

## Open the workflow ✓ passed (1.83s)
md5: a39dd765ebe57e7fb056eb8a4b3b8ea6
Go to https://my-testing-repo-main.vercel.app/slack/workflow-form?reset=true, click "⚡ Request time off", and verify a "Request time off" form with Start date, End date, Type and Reason.

## Invalid dates ✓ passed (37.3s)
md5: 8c8365a140b9daa4630f1490dda4cb04
Set Start date to 2026-09-23 and End date to 2026-09-21, click "Submit", and verify "End date must be on or after the start date."

## Submit ✓ passed (58.9s)
md5: daeda5e14e2afc71a35020f57783c653
Change End date to 2026-09-25, type "Family trip" into Reason, click "Submit", and verify the form closes.

## Verify the posted confirmation ✓ passed (40.9s)
md5: e482ad5bd96596b33bad381317ea3a29
Verify the newest message in #general is from "Workflow Bot" and reads "✅ Demo User requested time off: 2026-09-23 to 2026-09-25 (Vacation) · “Family trip”. Manager: Priya Nair has been notified."
