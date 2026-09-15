---
mode: testing
url: https://my-testing-repo-main.vercel.app/teams-clone-app/calendar?reset=true
max_steps: 40
tags: [microsoft-teams, work-collab, meetings]
---

# Teemz 36.1: Meeting join from calendar

Catalog objective: join a scheduled meeting from its calendar entry.
Key assertion: the in-meeting screen appears with working mic controls.

## Find the meeting on the calendar
Verify the "Scheduled meetings" card lists "Launch readiness review" at "10:00 – 10:30" organised by "Mira Shah" with a "Join" button.

## Join it
Click the "Join" button on the "Launch readiness review" row and verify the page moves to the in-meeting screen titled "Launch readiness review" with a "You are in the meeting" card.

## Verify the meeting controls
Verify the in-meeting card shows "Microphone" of "Muted", "Camera" of "Off", "Screen share" of "Not sharing", and buttons labelled "Unmute", "Start video", "Share screen" and "Leave".

## Unmute and confirm the control works
Click "Unmute" and verify "Microphone" now reads "Unmuted" and the button is labelled "Mute".
