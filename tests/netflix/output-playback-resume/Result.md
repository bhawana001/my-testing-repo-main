---
test: ../playback-resume_test.md
status: passed
started: 2026-09-13T19:11:49.971Z
duration_s: 152
session_id: 2772b19d-f848-41d0-a340-2167e841a8ba
---

# Netflixy 47.2: Playback start and resume — Result

## Open continue watching ✓ passed (1.39s)
md5: e7f96bdf718b97610d19ef6434629853
Go to https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true and verify the heading "Continue watching for Demo" is visible, the badge says "Session A: Living room TV", and the title "Signal Lost" shows "Not started".

## Play the title ✓ passed (0.73s)
md5: d518b9d9ee0021d41124eab0b1dbfcf8
Click the "Play" button and verify the player shows "Signal Lost" with a time counter.

## Stop playback ✓ passed (44.4s)
md5: cd28713418a3c244914ab33213f459af
Click the "Stop and go back" button below the player and verify the "Signal Lost" card shows a line starting with "Resume from" and ending with "(saved from session A)".

## Record the resume point ✓ passed (38.9s)
md5: af34c399ba2426445fce38c7e04bc839
Store the time shown after "Resume from" as 'resume_a'.

## Switch to the other session ✓ passed (39.4s)
md5: 8737422020a84bb1293c1458cd6bc0e7
Click the "Phone" device button in the top bar and verify the badge reads "Session B: Phone" and the card still shows "Resume from {{resume_a}} (saved from session A)".

## Resume on the second session ✓ passed (25.3s)
md5: a888002e512407855136841cc9a62e2f
Click the "Resume" button and verify the banner "Resumed on session B from {{resume_a}} (saved from session A)" is shown above the player.
