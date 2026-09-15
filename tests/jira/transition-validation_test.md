---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira-clone-app/browse/ACME-102?reset=true
max_steps: 40
tags: [jira, work-collab, workflow]
---

# Jiira 41.4: Workflow transition validation

Catalog objective: attempt to close an issue that is missing a required field.
Key assertion: validation blocks the transition with a clear message.

## Verify the issue is unresolved
Verify the Details card shows "Status" of "To Do" and "Resolution" of "Unresolved".

## Choose the closing transition
Select "Done" in "Transition to" and verify a "Resolution" dropdown appears reading "None".

## Verify the workflow warns before you try
Verify an amber banner titled "This transition is blocked" reads "Resolution is required before this issue can be closed."

## Attempt the transition and confirm it is refused
Click "Apply transition" and verify a red banner reads "Resolution is required before this issue can be closed." and "Status" still reads "To Do".
