---
test: ../cloud-recording_test.md
status: passed
started: 2026-09-13T16:35:22.877Z
duration_s: 229
session_id: df1beeca-419b-470a-875f-9681b14a9d4a
---

# Zoomly 37.4: Recording to cloud — Result

## Record ✓ passed (25.3s)
md5: 9a07bfd49ad96c62c8f7fe5973e638ac
Go to https://my-testing-repo-main.vercel.app/zoom/cloud-recording?reset=true, click "⏺ Record to the cloud", and verify "● Recording to the cloud…" is shown.

## Stop ✓ passed (52s)
md5: d5be2ca702026273b05627adac7a0ed6
Click "■ Stop recording" and verify "Recording stopped. It will appear in Recordings after processing."

## Check recordings ✓ passed (48.4s)
md5: 63cc0feb948f9772f34327d6cba0af5e
Click "Recordings" and verify a row "Weekly sync · Sep 14, 2026 · 0:32" with status "Processing".

## Finish processing ✓ passed (25.7s)
md5: abc88b8b3f6bbbd923ad636739aca75e
Click "Simulate processing complete" and verify the status reads "Ready".

## Open the recording ✓ passed (45.2s)
md5: e70ba077a213d767737be97edb67f3b2
Click "▶ Play" and verify a player titled "Weekly sync · Sep 14, 2026" showing "0:00 / 0:32".

## Play it ✓ passed (30.1s)
md5: b1627465a7d32e3b348d093318c17be0
Click the player's "Play" button and verify the time counter advances past 0:00.
