---
test: ../screen-share_test.md
status: passed
started: 2026-09-13T16:33:16.614Z
duration_s: 109
session_id: 512bb875-507c-4e23-b952-af8a8e508794
---

# Zoomly 37.3: Screen share — Result

## Open the meeting ✓ passed (21.7s)
md5: 08f9d32628e117e0531b41a501908a6e
Go to https://my-testing-repo-main.vercel.app/zoom/screen-share?reset=true and verify the participant view says "No one is sharing".

## Start sharing ✓ passed (37s)
md5: a1f83585f14cc9e03b2d664ff06b5a29
Click "🖥️ Share screen", choose "Q3 Roadmap.pptx", click "Share", and verify the share picker closes.

## Verify the host indicator ✓ passed (28.9s)
md5: 87ecdf6e2fc1efaddb778f77811a26dd
Verify the host view shows a green bar "You are sharing: Q3 Roadmap.pptx" with "Stop share".

## Verify the participant view ✓ passed (19.1s)
md5: c17a7f4b4775978c73261c2f7a0c4396
Verify the participant view (Priya Nair) shows "Demo User is sharing" and the shared content "Q3 Roadmap.pptx".
