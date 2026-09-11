---
mode: testing
url: https://my-testing-repo-main.vercel.app/disney-hotstar/live-sports-playback?reset=true
max_steps: 45
tags: [disney-hotstar, streaming, media]
---

# Hotstarry 50.1: Live sports playback

Catalog objective: open a live match stream and verify the player loads with a score overlay.
Key assertion: the stream plays with a live indicator.

## Open the match
Go to https://my-testing-repo-main.vercel.app/disney-hotstar/live-sports-playback?reset=true and verify the player "IND vs AUS · 2nd ODI" with a score overlay "IND 214/4" and "38.2 ov · Target 289".

## Play
Click "▶ Play" and verify the red "● LIVE" indicator appears and the button reads "❚❚ Pause".

## Verify the live overlay updates
Wait 5 seconds and verify the score overlay has advanced to "IND 215/4" and "38.3 ov".
