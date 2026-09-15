---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow-clone-app/changes?reset=true
max_steps: 45
tags: [servicenow, itsm, change]
---

# ServiceNau 34.2: Approval workflow

Catalog objective: submit a change request and approve it as the approver.
Key assertion: the state moves to approved.

## Open the change request
Click "CHG0030011" and verify the detail card shows "State" of "Assess" and "Approver" of "Dan Okafor".

## Submit it for approval
Click "Submit for approval" and verify a banner says it was sent to Dan Okafor, and "State" now reads "Awaiting approval".

## Verify the wrong approver is refused
Select "Mira Shah" in "Acting as", click "Approve", and verify a red banner reads "Only Dan Okafor can approve this change. You are acting as Mira Shah." and "State" is still "Awaiting approval".

## Approve as the named approver
Select "Dan Okafor" in "Acting as", click "Approve", and verify a green banner reads "CHG0030011 is now Approved.", "State" reads "Approved", and the activity log contains "Approved by Dan Okafor".
