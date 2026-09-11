---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom/waiting-room?reset=true
max_steps: 45
tags: [zoom, work-collab, media]
---

# Zoomly 37.2: Join flow with waiting room

Catalog objective: join as a guest and wait, then admit from the host side.
Key assertion: the guest enters only after admission.

## Guest joins
Go to https://my-testing-repo-main.vercel.app/zoom/waiting-room?reset=true, keep "Sam Lee" as the guest name, click "Join meeting" in the Guest view, and verify "Please wait, the meeting host will let you in soon."

## Guest is held
Verify the guest view does not show "You're in the meeting", the Host view shows "Waiting room (1)" with "Sam Lee" and an "Admit" button, and "Participants: 1".

## Admit
Click "Admit" in the Host view and verify the Guest view shows "You're in the meeting" and the Host view shows "Participants: 2".
