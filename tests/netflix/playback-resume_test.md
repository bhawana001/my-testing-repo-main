---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true
max_steps: 30
tags: [netflix, streaming, media]
---

# Netflixy 47.2: Playback start and resume

Catalog objective: play a title, stop, and resume from another session.
Key assertion: the resume point is within seconds of where playback stopped.

## Open continue watching
Go to https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true and verify the heading "Continue watching for Demo" is visible, the badge says "Session A: Living room TV", and the title "Signal Lost" shows "Not started".

## Play the title
Click the "Play" button and verify the player shows "Signal Lost" with a time counter that starts increasing from 0:00.

## Stop after a few seconds
Wait 3 seconds, then click "Stop and go back". Store the resume time shown in the text "Resume from" as 'resume_a'.

## Switch to the other session
Click the "Phone" device button in the top bar. Verify the badge now reads "Session B: Phone" and the title shows "Resume from {{resume_a}}" with "(saved from session A)".

## Resume on the second session
Click the "Resume" button and verify the player time counter starts at {{resume_a}} (within 5 seconds of it) rather than 0:00.
