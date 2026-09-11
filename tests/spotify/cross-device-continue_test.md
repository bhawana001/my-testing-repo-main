---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify/cross-device-continue?reset=true
max_steps: 45
tags: [spotify, streaming, media]
---

# Spotifly 48.3: Cross-device continue

Catalog objective: start on web and continue on a second session.
Key assertion: playback state transfers.

## Play on web
Go to https://my-testing-repo-main.vercel.app/spotify/cross-device-continue?reset=true, click "▶ Play" in the Web Player panel, and verify "Playing on this device" with the time counter advancing.

## Pause on web
After a few seconds, click "❚❚ Pause" in the Web Player and store the Web Player time as 'web_pos'.

## Transfer to phone
Click "Play on this device" in the Phone panel and verify the Phone panel shows "Paused on this device" and the Web Player shows "Listening on Phone".

## Verify the state transferred
Verify the Phone panel's time equals {{web_pos}}.
