---
test: ../waiting-room_test.md
status: passed
started: 2026-09-13T16:30:31.226Z
duration_s: 147
session_id: 88297076-96a1-4b60-8f72-ac8616fe1356
---

# Zoomly 37.2: Join flow with waiting room — Result

## Guest joins ✓ passed (41.1s)
md5: a65c55acc0dbc28e5d576642a693bac8
Go to https://my-testing-repo-main.vercel.app/zoom/waiting-room?reset=true, keep "Sam Lee" as the guest name, click "Join meeting" in the Guest view, and verify "Please wait, the meeting host will let you in soon."

## Guest is held ✓ passed (39.1s)
md5: f62ae3a26af46f0ae8e70bc643353dbb
Verify the guest view does not show "You're in the meeting", the Host view shows "Waiting room (1)" with "Sam Lee" and an "Admit" button, and "Participants: 1".

## Admit ✓ passed (28.3s)
md5: 20bacb3788180826be9aa1a92c8dd5d3
Click "Admit" in the Host view and verify the Guest view shows "You're in the meeting" and the Host view shows "Participants: 2".
