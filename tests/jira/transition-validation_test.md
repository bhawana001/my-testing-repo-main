---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira/transition-validation?reset=true
max_steps: 45
tags: [jira, work-collab, crud]
---

# Jirah 41.4: Workflow transition validation

Catalog objective: attempt to close an issue that is missing a required field.
Key assertion: validation blocks it with a clear message.

## Open the issue
Go to https://my-testing-repo-main.vercel.app/jira/transition-validation?reset=true and verify WEB-123 has Status "In Review", Resolution "Unresolved" and Fix version/s "None".

## Attempt Done without fields
Click "Done", then click "Done" in the transition screen, and verify "Resolution is required.", "Fix version/s is required to close a Bug." and "This transition is blocked until the required fields are completed." with the status still "In Review".

## Complete the fields
Select "Fixed" for Resolution and "2026.09" for Fix version/s, click "Done", and verify Status "Done" and Resolution "Fixed".
