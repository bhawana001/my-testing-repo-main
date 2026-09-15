---
mode: testing
url: https://my-testing-repo-main.vercel.app/hotstar-clone-app/watch/m1?reset=true
max_steps: 45
tags: [disney-hotstar, media, live]
---

# Hotstarr 50.1: Live sports playback

Catalog objective: open a live match stream and verify the player loads with a score overlay.
Key assertion: the stream plays with a live indicator.

## Verify the player loaded
Verify the page title reads "Harbour Kings v Summit Royals" with a Player card, and click "Play" so the player state reads "Stream playing".

## Verify the score overlay on the player
Verify the overlay on the player shows "● LIVE", "HKG 148/4" and "(16.2 ov)", and that "SMR yet to bat" is shown.

## Verify the live indicator
Verify a badge beneath the player reads "LIVE" and "Behind live" reads "0s".

## Verify the overlay tracks the match
Click "Next ball" and verify the overlay score now reads "HKG 149/4" with "(16.3 ov)" and the score readout line agrees.
