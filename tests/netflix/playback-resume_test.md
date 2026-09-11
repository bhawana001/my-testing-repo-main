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
Click the "Play" button and verify the player shows "Signal Lost" with a time counter.

## Stop playback
Click the "Stop and go back" button below the player and verify the "Signal Lost" card shows a line starting with "Resume from" and ending with "(saved from session A)".

## Record the resume point
Store the time shown after "Resume from" as 'resume_a'.

## Switch to the other session
Click the "Phone" device button in the top bar and verify the badge reads "Session B: Phone" and the card still shows "Resume from {{resume_a}} (saved from session A)".

## Resume on the second session
Click the "Resume" button and verify the banner "Resumed on session B from {{resume_a}} (saved from session A)" is shown above the player.
