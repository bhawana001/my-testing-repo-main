---
test: ../playlist-create_test.md
status: passed
started: 2026-09-13T19:25:30.546Z
duration_s: 152
session_id: 965240c3-bae9-476e-aeb9-52812a9f023a
---

# Spotifly 48.2: Playlist create and add — Result

## Create ✓ passed (36.6s)
md5: 12c7052f4758d00cc03326c064816d7e
Go to https://my-testing-repo-main.vercel.app/spotify/playlist-create?reset=true, type "Road Trip" into the playlist name, click "Create", and verify "🎵 Road Trip" with "0 songs".

## Add three songs ✓ passed (40.7s)
md5: 26ea011dba15664c6ad330435bc21fa2
Click "Add" next to "Midnight Drive", "Glass Harbor" and "Slow Satellite", and verify "3 songs".

## Try a duplicate ✓ passed (42.2s)
md5: d4e07beef6226756106f66fda10f4d66
Click "Add" next to "Midnight Drive" again and verify "“Midnight Drive” is already in this playlist." with the count still "3 songs".

## Verify after reload ✓ passed (30.8s)
md5: f687c47605794fbb97d2b2e02356aeda
Reload the page without the reset parameter and verify "Road Trip" still lists 1. Midnight Drive, 2. Glass Harbor, 3. Slow Satellite.
