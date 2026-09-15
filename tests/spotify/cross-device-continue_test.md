---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify-clone-app/devices?reset=true
max_steps: 40
tags: [spotify, media, playback]
---

# Spotifly 48.3: Cross-device continue

Catalog objective: start on the web player and continue on a second device.
Key assertion: the playback state transfers.

## Verify where playback starts
Verify the playback state card shows "Track" of "Neon Harbour", "Position" of "0:00" and "Playing on" of "Web Player — Chrome".

## Build up some playback position
Click "Listen for 45 seconds" and verify "Position" now reads "0:45" and "Status" reads "Playing".

## Hand playback to another device
Click "Play here" on "Priya's Phone" and verify a green banner reads "Playback moved from Web Player — Chrome to Priya's Phone at 0:45."

## Verify the state transferred intact
Verify "Playing on" now reads "Priya's Phone", "Track" still reads "Neon Harbour" and "Position" is still "0:45", and the "Priya's Phone" row carries a "Currently playing" badge.
