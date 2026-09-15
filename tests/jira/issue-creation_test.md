---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira-clone-app/create?reset=true
max_steps: 40
tags: [jira, work-collab, issues]
---

# Jiira 41.1: Issue creation with fields

Catalog objective: create a bug with a priority and a component.
Key assertion: an issue key is generated with the fields set.

## Fill the issue form
Select "Bug" in "Issue type", type "Coupon field rejects valid codes" into "Summary", select "Highest" in "Priority", select "Checkout" in "Component", and verify "Priority" reads "Highest".

## Create the issue
Click "Create" and verify a green banner titled "Issue created" shows the key "ACME-105".

## Verify the fields were saved
Verify the "Created issue" card shows "Key" of "ACME-105", "Type" of "Bug", "Priority" of "Highest", "Component" of "Checkout" and "Status" of "To Do".

## Open the issue
Click "Open it" and verify the issue page title reads "ACME-105 — Coupon field rejects valid codes" with "Priority" of "Highest" and "Component" of "Checkout".
