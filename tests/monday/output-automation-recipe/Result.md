---
test: ../automation-recipe_test.md
status: passed
started: 2026-09-15T07:01:25.325Z
duration_s: 111
session_id: 199489f4-943c-40b2-a250-db34be30cfae
---

# Mondayly 42.2: Automation recipe — Result

## Create the automation ✓ passed (47s)
md5: 5062affc15b7a2f9291f21604f55c7f7
Go to https://my-testing-repo-main.vercel.app/monday/automation-recipe?reset=true, keep the recipe "When Status changes to Done, notify Priya Nair", click "Create automation", and verify it is listed as "Active".

## Trigger it ✓ passed (27s)
md5: 0d011b1750346122bab42be81bc4ea7b
Change the Status of "Design review" to "Done" and verify the dropdown shows "Done".

## Verify the notification ✓ passed (35s)
md5: 89ea10cc39ad751f103df502642fea94
Click "Priya" in the top bar and verify the bell shows "1" and "Automation: “Design review” status changed to Done".
