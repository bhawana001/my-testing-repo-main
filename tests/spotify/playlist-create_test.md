---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify-clone-app/playlists?reset=true
max_steps: 50
tags: [spotify, media, library]
---

# Spotifly 48.2: Playlist create and add

Catalog objective: create a playlist and add three songs.
Key assertion: the playlist persists with the correct tracks.

## Create the playlist
Type "Deep focus" into "Name", click "Create playlist", and verify a green banner reads "Playlist created." and a "Deep focus" playlist appears with "0 tracks".

## Add three tracks
Select "Paper Lanterns — Hollow Coast" in the track picker and click "Add to this playlist", then select "Glass Corridor — Vela Nine" and click "Add to this playlist", then select "Winter Radio — Marlowe Grey" and click "Add to this playlist".

## Verify the tracks
Verify the "Deep focus" card shows "Tracks" of 3 listing "Paper Lanterns", "Glass Corridor" and "Winter Radio" in that order.

## Verify the playlist persists
Reload https://my-testing-repo-main.vercel.app/spotify-clone-app/playlists and verify the "Deep focus" playlist still shows "3 tracks".
