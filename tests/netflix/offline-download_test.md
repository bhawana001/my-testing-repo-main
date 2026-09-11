---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/offline-download?reset=true
max_steps: 45
tags: [netflix, streaming, media]
---

# Netflixy 47.4: Download for offline

Catalog objective: download an episode on mobile viewport (mobile web equivalent).
Key assertion: the download completes and is in a playable state.

## Download an episode
Go to https://my-testing-repo-main.vercel.app/netflix/offline-download?reset=true, click "⬇ Download" on "1. Static", and wait until the label reads "Downloaded · available offline".

## Go offline
Turn on the ✈️ airplane-mode switch and verify "Offline · only downloads can play".

## Open downloads
Click "Downloads" and verify "1. Static" is listed as "Downloaded" with a "▶ Play" button.

## Play offline
Click "▶ Play" and verify the player shows "Signal Lost" and its time counter advances from 0:00 while offline.
