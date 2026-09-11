---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira/issue-creation?reset=true
max_steps: 45
tags: [jira, work-collab, crud]
---

# Jirah 41.1: Issue creation with fields

Catalog objective: create a bug with priority and component.
Key assertion: an issue key is generated with the fields set.

## Open Create
Go to https://my-testing-repo-main.vercel.app/jira/issue-creation?reset=true, click "Create", and verify the "Create issue" dialog with Issue type "Bug".

## Missing component
Type "Cart total wrong after coupon removal" into Summary, select "High" priority, click "Create", and verify "Component is required for Bugs."

## Create
Select "Payments" as Component, click "Create", and verify "WEB-128 has been created".

## Verify the issue
Verify the issue view shows Key "WEB-128", Type "Bug", Priority "High", Component "Payments" and Status "To Do".
