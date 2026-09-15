---
test: ../offline-download_test.md
status: passed
started: 2026-09-13T19:17:11.029Z
duration_s: 143
session_id: da3bf79a-fc53-4c82-852e-0652d5ab4f40
---

# Netflixy 47.4: Download for offline — Result

## Download an episode ✓ passed (26.8s)
md5: 132dab2841ef409bc393106a738b4e19
Go to https://my-testing-repo-main.vercel.app/netflix/offline-download?reset=true, click "⬇ Download" on "1. Static", and wait until the label reads "Downloaded · available offline".

## Go offline ✓ passed (40.6s)
md5: 1c0827d1f1d65e81c4a47a7152eb843c
Turn on the ✈️ airplane-mode switch and verify "Offline · only downloads can play".

## Open downloads ✓ passed (34.7s)
md5: 5e84f2a7080c398fab942160105088b4
Click "Downloads" and verify "1. Static" is listed as "Downloaded" with a "▶ Play" button.

## Play offline ✓ passed (39.3s)
md5: 7719da0a8134ff9cb6c19545e8bc7278
Click "▶ Play" and verify the player shows "Signal Lost" and its time counter advances from 0:00 while offline.
