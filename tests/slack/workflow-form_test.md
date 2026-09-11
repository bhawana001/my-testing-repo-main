---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/workflow-form?reset=true
max_steps: 45
tags: [slack, work-collab, wizard]
---

# Slacky 35.5: Workflow form submission

Catalog objective: trigger a workflow form and submit it.
Key assertion: a confirmation message is posted.

## Open the workflow
Go to https://my-testing-repo-main.vercel.app/slack/workflow-form?reset=true, click "⚡ Request time off", and verify a "Request time off" form with Start date, End date, Type and Reason.

## Invalid dates
Set Start date to 2026-09-23 and End date to 2026-09-21, click "Submit", and verify "End date must be on or after the start date."

## Submit
Change End date to 2026-09-25, type "Family trip" into Reason, click "Submit", and verify the form closes.

## Verify the posted confirmation
Verify the newest message in #general is from "Workflow Bot" and reads "✅ Demo User requested time off: 2026-09-23 to 2026-09-25 (Vacation) · “Family trip”. Manager: Priya Nair has been notified."
