---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify/playlist-create?reset=true
max_steps: 45
tags: [spotify, streaming, media]
---

# Spotifly 48.2: Playlist create and add

Catalog objective: create a playlist and add three songs.
Key assertion: the playlist persists with the correct tracks.

## Create
Go to https://my-testing-repo-main.vercel.app/spotify/playlist-create?reset=true, type "Road Trip" into the playlist name, click "Create", and verify "🎵 Road Trip" with "0 songs".

## Add three songs
Click "Add" next to "Midnight Drive", "Glass Harbor" and "Slow Satellite", and verify "3 songs".

## Try a duplicate
Click "Add" next to "Midnight Drive" again and verify "“Midnight Drive” is already in this playlist." with the count still "3 songs".

## Verify after reload
Reload the page without the reset parameter and verify "Road Trip" still lists 1. Midnight Drive, 2. Glass Harbor, 3. Slow Satellite.
