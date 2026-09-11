---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoom/screen-share?reset=true
max_steps: 45
tags: [zoom, work-collab, media]
---

# Zoomly 37.3: Screen share

Catalog objective: share a screen and verify viewers see it.
Key assertion: the share indicator is active for participants.

## Open the meeting
Go to https://my-testing-repo-main.vercel.app/zoom/screen-share?reset=true and verify the participant view says "No one is sharing".

## Start sharing
Click "🖥️ Share screen", choose "Q3 Roadmap.pptx", click "Share", and verify the share picker closes.

## Verify the host indicator
Verify the host view shows a green bar "You are sharing: Q3 Roadmap.pptx" with "Stop share".

## Verify the participant view
Verify the participant view (Priya Nair) shows "Demo User is sharing" and the shared content "Q3 Roadmap.pptx".
