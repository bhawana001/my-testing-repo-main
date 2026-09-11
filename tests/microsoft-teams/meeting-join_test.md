---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/meeting-join?reset=true
max_steps: 45
tags: [microsoft-teams, work-collab, media]
---

# Teamz 36.1: Meeting join from calendar

Catalog objective: join a scheduled meeting from a calendar entry.
Key assertion: the in-meeting screen shows mic controls.

## Open the calendar entry
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/meeting-join?reset=true, click "Sprint planning" on Mon 14, and verify the details show "10:30–11:00 · Organizer Priya Nair" with a "Join" button.

## Pre-join
Click "Join" and verify "Choose your video and audio options" with Camera and Microphone switches.

## Join
Click "Join now" and verify the badge "In meeting", a running timer, and participant tiles for Demo User, Priya Nair and Tom Alvarez.

## Use the mic control
Verify the control bar has "🎙️ Mute", "📷 Start video" and "Leave", click "🎙️ Mute", and verify "Microphone muted" and the button now reads "🔇 Unmute".
