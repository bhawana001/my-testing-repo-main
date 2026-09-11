---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom/cloud-recording?reset=true
max_steps: 45
tags: [zoom, work-collab, media]
---

# Zoomly 37.4: Recording to cloud

Catalog objective: record a short session and verify the cloud recording is listed.
Key assertion: the recording appears with playback.

## Record
Go to https://my-testing-repo-main.vercel.app/zoom/cloud-recording?reset=true, click "⏺ Record to the cloud", and verify "● Recording to the cloud…" is shown.

## Stop
Click "■ Stop recording" and verify "Recording stopped. It will appear in Recordings after processing."

## Check recordings
Click "Recordings" and verify a row "Weekly sync · Sep 14, 2026 · 0:32" with status "Processing".

## Finish processing and play
Click "Simulate processing complete", verify the status reads "Ready", click "▶ Play", then click the player's "Play" button and verify the time counter advances from 0:00 toward 0:32.
