---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom-clone-app/m/91422005501?reset=true
max_steps: 40
tags: [zoom, work-collab, media]
---

# Zuum 37.3: Screen share

Catalog objective: share a screen and verify the viewers see it.
Key assertion: the share indicator is active for the participants.

## Verify nothing is being shared yet
Verify the Stage card shows "Gallery view — nobody is sharing".

## Start sharing
Click "Share screen" and verify the stage now shows "Priya Nair is sharing Screen 1".

## Verify the share indicator
Verify a green badge reads "Screen sharing is active" and the button is now labelled "Stop share".

## Verify participants see the share
Verify the Participants card shows the "Priya Nair" row carrying both a "sharing" badge and a "viewing shared screen" badge.
