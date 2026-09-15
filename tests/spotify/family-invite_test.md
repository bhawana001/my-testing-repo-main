---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify-clone-app/family?reset=true
max_steps: 40
tags: [spotify, media, subscription]
---

# Spotifly 48.4: Family plan invite

Catalog objective: invite a member to the family plan.
Key assertion: the invite is sent and shows as pending.

## Verify the starting seats
Verify the page subtitle reads "1 of 6 seats used" and the Members card shows "Members" of 1.

## Send the invite
Type "sam@home.test" into "Email", click "Send invite", and verify a green banner reads "Invite sent to sam@home.test — it stays pending until they accept."

## Verify the pending state
Verify the Invites card shows "Pending invites" of 1 with a row for "sam@home.test" carrying a "Pending" badge.

## Verify the seat is reserved but not yet a member
Verify the page subtitle now reads "2 of 6 seats used" while the Members card still shows "Members" of 1.
