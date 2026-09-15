---
test: ../video-upload_test.md
status: failed
started: 2026-09-15T07:08:03.521Z
duration_s: 183
session_id: 41f3e17a-4473-40b8-8919-ff435ec706f4
---

# YouTubely 49.1: Video upload and process — Result

## Select the file ✓ passed (44.1s)
md5: 5d7062b54da80d645a72a96001a28c1f
Go to https://my-testing-repo-main.vercel.app/youtube/video-upload?reset=true, click "Select sample demo-clip.mp4", and verify "demo-clip.mp4 · 00:42 · 18 MB".

## Details ✓ passed (41.8s)
md5: 3c9817369c036333d03e283c9fe4e924
Click "Continue", type "My first edge deploy" into Title, choose "No, it's not made for kids", click "Continue", and verify the "Visibility" step.

## Visibility ✓ passed (36.4s)
md5: d68704c21fe4987153a63db0d9d697c6
Choose "Unlisted", click "Publish", and wait for "Processing complete. Your video is unlisted."

## Play ✗ failed (58.5s)
md5: 6c99bd6193859b2f816cbc045a02d81c
Reason: AP produced no action for 3 consecutive steps — bug verdict: Agent stalled after successful playback verification [automation_bug/agent_misstep, confidence 0.97]
Click the player's "Play" button and verify the time advances past 0:00 and the badge reads "Unlisted" with an "Anyone with the link" note.
