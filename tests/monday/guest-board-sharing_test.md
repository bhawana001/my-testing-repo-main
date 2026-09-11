---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday/guest-board-sharing?reset=true
max_steps: 45
tags: [monday, work-collab, auth]
---

# Mondayly 42.4: Guest board sharing

Catalog objective: invite a guest to one board only.
Key assertion: the guest sees only the shared board.

## Invite the guest
Go to https://my-testing-repo-main.vercel.app/monday/guest-board-sharing?reset=true, type "sam@client.test" into Guest email, keep "Client project · Globex" selected, click "Invite as guest", and verify "sam@client.test invited as Guest to “Client project · Globex” only."

## View as the guest
Click "View as guest" and verify "Boards (1)" lists only "Client project · Globex" (Marketing plan and Finance are not listed).

## Try a board that wasn't shared
Click the direct link "/boards/finance-budget-2026" and verify "You don't have access to this board."
