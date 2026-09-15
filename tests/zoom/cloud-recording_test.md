---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom-clone-app/m/91422005501?reset=true
max_steps: 45
tags: [zoom, work-collab, media]
---

# Zuum 37.4: Recording to cloud

Catalog objective: record a short session and verify the cloud recording is listed.
Key assertion: the recording appears with playback.

## Start recording
Click "Record to the cloud" and verify a banner reads "Recording — this meeting is being recorded to the cloud." and the stage shows a "● Recording" badge.

## Stop recording
Click "Stop recording" and verify a green banner says the recording was saved to the cloud with "Quarterly product review" and "00:04:12".

## Open the cloud recordings library
Go to https://my-testing-repo-main.vercel.app/zoom-clone-app/recordings and verify the Library card reads "1 recording" with an entry titled "Quarterly product review".

## Play it back
Click "Play" on the "Quarterly product review" row and verify a Playback card appears showing "Playing Quarterly product review", "Duration" of "00:04:12" and "Stored in" of "Cloud".
