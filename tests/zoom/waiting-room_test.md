---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom-clone-app/join/91422005501?reset=true
max_steps: 45
tags: [zoom, work-collab, meetings]
---

# Zuum 37.2: Join flow with waiting room

Catalog objective: join as a guest and wait, then admit from the host side.
Key assertion: the guest enters only after being admitted.

## Knock as a guest
Type "Tom Alvarez" into "Your name", click "Join meeting", and verify an amber banner titled "Please wait" says the host will let you in soon.

## Verify the guest is held in the waiting room
Verify the Guest card shows "Your status" of "Waiting room" and the Host controls card shows "In the waiting room" of 1 with a row for "Tom Alvarez" carrying a "waiting" badge.

## Verify the guest is not yet a participant
Verify the Host controls card shows "In the meeting" of 1.

## Admit from the host side
Click "Admit" on the "Tom Alvarez" row and verify the Guest card now shows "Your status" of "In meeting" with a green banner reading "You are in the meeting", and the Host controls card shows "In the waiting room" of 0 and "In the meeting" of 2.
