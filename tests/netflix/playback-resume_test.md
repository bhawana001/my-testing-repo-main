---
mode: testing
url: https://my-testing-repo-main.vercel.app/stream-clone-app/watch/b99?reset=true
max_steps: 45
tags: [netflix, streaming, playback]
---

# StreamFlix 47.2: Playback resume

Catalog objective: play a title, stop, then resume from another session.
Key assertion: the resume point is within seconds of where playback stopped.

## Verify the saved resume point
Verify a resume prompt says you stopped at "9:00" of "22:00", with a button offering to resume from "9:00".

## Resume and watch a little
Click the resume button, let playback run briefly, and verify the playhead has moved past "9:00".

## Stop and save
Click "Stop and save" and verify the saved progress line names a saved resume point at the playhead position.

## Verify the point survives leaving the player
Reload https://my-testing-repo-main.vercel.app/stream-clone-app/watch/b99 and verify the resume prompt now offers the saved position rather than the original "9:00".
