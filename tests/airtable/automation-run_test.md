---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/automation-run?reset=true
max_steps: 45
tags: [airtable, work-collab, crud]
---

# Airtably 39.4: Automation run

Catalog objective: trigger an automation with a record change.
Key assertion: the automation action is executed and logged.

## Review the automation
Go to https://my-testing-repo-main.vercel.app/airtable/automation-run?reset=true and verify the automation "When Status becomes Done" is On and Run history says "No runs yet."

## Change a record
Change the Status of "Write release notes" to "Done".

## Verify execution and log
Verify the record's Completed field reads "2026-09-14" and Run history shows "Run #1 · Write release notes" "Succeeded" with "Set “Completed” = 2026-09-14 on rec-21" and "Sent message to #launch".
