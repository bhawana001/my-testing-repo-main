---
test: ../issue-creation_test.md
status: passed
started: 2026-09-13T17:47:16.708Z
duration_s: 1150
session_id: 861120c4-b379-4d32-b27f-23f436769c8e
---

# Jirah 41.1: Issue creation with fields — Result

## Open Create ✓ passed (23.1s)
md5: e0b8aee237fbaf757a234d24b15ce894
Go to https://my-testing-repo-main.vercel.app/jira/issue-creation?reset=true, click "Create", and verify the "Create issue" dialog with Issue type "Bug".

## Missing component ✓ passed (45.1s)
md5: 0a1ec54d5c52537c636cada10c2c4b8b
Type "Cart total wrong after coupon removal" into Summary, select "High" priority, click "Create", and verify "Component is required for Bugs."

## Create ✓ passed (38.9s)
md5: 9929944be43ce2ea12a9cbf64a9a2437
Select "Payments" as Component, click "Create", and verify "WEB-128 has been created".

## Verify the issue ✓ passed (141.8s)
md5: b5a1f70931994c5b6ca8fb52e1c27721
Verify the issue view shows Key "WEB-128", Type "Bug", Priority "High", Component "Payments" and Status "To Do".
