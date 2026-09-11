---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify/playlist-create?reset=true
max_steps: 30
tags: [spotify, streaming, media]
variables:
  demo_email: { value: "demo@evals.dev" }
  demo_password: { value: "Demo123!", secret: true }
  otp: { value: "123456" }
  card_success: { value: "4242 4242 4242 4242" }
  card_decline: { value: "4000 0000 0000 0002" }
---

# Spotifly 48.2: Playlist create and add

<!-- DRAFT generated from the catalog. Refined with concrete steps once the flow ships (day 13). -->
<!-- Catalog entity: Spotify · Industry: Streaming · Pattern: Media player -->

## Open the flow
Go to https://my-testing-repo-main.vercel.app/spotify/playlist-create?reset=true and verify the text "Use case 48.2" and "Playlist create and add" are visible at the top of the page.

## Objective
Create a playlist and add three songs.

## Key assertion
Verify: Playlist persists with correct tracks.
