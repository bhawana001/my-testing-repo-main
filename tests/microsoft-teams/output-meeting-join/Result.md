---
test: ../meeting-join_test.md
status: passed
started: 2026-09-15T06:49:27.958Z
duration_s: 97
session_id: e27e95ef-2736-4b65-a96b-acac895a3b1d
---

# Teamz 36.1: Meeting join from calendar — Result

## Open the calendar entry ✓ passed (1.52s)
md5: bd0dc8995025a075891fc0f463ef765f
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/meeting-join?reset=true, click "Sprint planning" on Mon 14, and verify the details show "10:30–11:00 · Organizer Priya Nair" with a "Join" button.

## Pre-join ✓ passed (0.81s)
md5: 5d645b6421c8215a1f1d766486d4a16a
Click "Join" and verify "Choose your video and audio options" with Camera and Microphone switches.

## Join ✓ passed (40.4s)
md5: 47d538c3d4385ca504a2c310a608d6ab
Click "Join now" and verify the badge "In meeting", a running timer, and participant tiles for Demo User, Priya Nair and Tom Alvarez.

## Use the mic control ✓ passed (52.4s)
md5: 3d22bed63b33326f5ce978983239d3dd
Verify the control bar has "🎙️ Mute", "📷 Start video" and "Leave", click "🎙️ Mute", and verify "Microphone muted" and the button now reads "🔇 Unmute".
