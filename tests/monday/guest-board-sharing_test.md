---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday-clone-app/sharing?reset=true
max_steps: 45
tags: [monday, work-collab, permissions]
---

# Mondee 42.4: Guest board sharing

Catalog objective: invite a guest to one board only.
Key assertion: the guest sees only the shared board.

## Invite the guest to a single board
Type "guest@partner.test" into "Email", make sure only "Launch plan" is ticked under "Boards", click "Invite as guest", and verify a green banner reads "guest@partner.test invited as a guest on 1 of 2 boards."

## Verify the guest record
Verify the Guests card lists "guest@partner.test" as a "Guest" with a single board badge reading "Launch plan".

## Verify what the owner sees
Select "Priya Nair (owner)" in "View as" and verify "Boards visible" reads "2 of 2".

## Verify the guest sees only that one board
Select "guest@partner.test (guest)" in "View as" and verify "Boards visible" reads "1 of 2", the visible list shows only "Launch plan", and the hidden line reads "Hidden from this viewer: Hiring pipeline".
