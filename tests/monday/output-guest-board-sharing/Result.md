---
test: ../guest-board-sharing_test.md
status: passed
started: 2026-09-15T07:03:32.830Z
duration_s: 62
session_id: 20cc50c4-06c8-44e0-abc0-7f3ab85c5f5e
---

# Mondayly 42.4: Guest board sharing — Result

## Invite the guest ✓ passed (1.82s)
md5: 35c37a19dbf81f53ae30e2fe96c2a4bc
Go to https://my-testing-repo-main.vercel.app/monday/guest-board-sharing?reset=true, type "sam@client.test" into Guest email, keep "Client project · Globex" selected, click "Invite as guest", and verify "sam@client.test invited as Guest to “Client project · Globex” only."

## View as the guest ✓ passed (30.3s)
md5: 71f7bd33ada1d2db014f81f644d7da13
Click "View as guest" and verify "Boards (1)" lists only "Client project · Globex" (Marketing plan and Finance are not listed).

## Try a board that wasn't shared ✓ passed (27.8s)
md5: 43d169cd38531db1eee58883c18ea196
Click the direct link "/boards/finance-budget-2026" and verify "You don't have access to this board."
