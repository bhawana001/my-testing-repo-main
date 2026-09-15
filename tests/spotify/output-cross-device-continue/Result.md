---
test: ../cross-device-continue_test.md
status: passed
started: 2026-09-13T19:28:21.503Z
duration_s: 164
session_id: 097df6e9-91b8-4a7e-ae92-776aec314937
---

# Spotifly 48.3: Cross-device continue — Result

## Play on web ✓ passed (55.6s)
md5: 4a0b5870d64359b1f3da0833307d85b8
Go to https://my-testing-repo-main.vercel.app/spotify/cross-device-continue?reset=true, click "▶ Play" in the Web Player panel, and verify "Playing on this device" with the time counter advancing.

## Pause on web ✓ passed (52.5s)
md5: 3fa8ed684b35add22d332a8ecd17b1bf
After a few seconds, click "❚❚ Pause" in the Web Player and store the Web Player time as 'web_pos'.

## Transfer to phone ✓ passed (29.8s)
md5: ba831ff03495f1a4e66303f09d9c6da0
Click "Play on this device" in the Phone panel and verify the Phone panel shows "Paused on this device" and the Web Player shows "Listening on Phone".

## Verify the state transferred ✓ passed (24.6s)
md5: 7821f596474dd25f3d1793218f432544
Verify the Phone panel's time equals {{web_pos}}.
