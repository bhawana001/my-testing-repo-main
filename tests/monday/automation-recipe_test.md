---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/automation-recipe?reset=true
max_steps: 45
tags: [monday, work-collab, crud]
---

# Mondayly 42.2: Automation recipe

Catalog objective: set a status-change notify automation and trigger it.
Key assertion: a notification is generated on change.

## Create the automation
Go to https://my-testing-repo-main.vercel.app/monday/automation-recipe?reset=true, keep the recipe "When Status changes to Done, notify Priya Nair", click "Create automation", and verify it is listed as "Active".

## Trigger it
Change the Status of "Design review" to "Done" and verify the dropdown shows "Done".

## Verify the notification
Click "Priya" in the top bar and verify the bell shows "1" and "Automation: “Design review” status changed to Done".
