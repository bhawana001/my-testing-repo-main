---
test: ../playback-resume_test.md
status: failed
started: 2026-09-11T14:07:33.453Z
duration_s: 609
session_id: e54f6d0a-8942-4f0e-9ed8-f1857c16edd5
---

# Netflixy 47.2: Playback start and resume — Result

## Open continue watching ✓ passed (1.35s)
md5: e7f96bdf718b97610d19ef6434629853
Go to https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true and verify the heading "Continue watching for Demo" is visible, the badge says "Session A: Living room TV", and the title "Signal Lost" shows "Not started".

## Play the title ✓ passed (55.2s)
md5: d518b9d9ee0021d41124eab0b1dbfcf8
Click the "Play" button and verify the player shows "Signal Lost" with a time counter.

## Stop playback ✗ failed (46.7s)
md5: 3e8d1e2b77efe685b19b6da5931e7d3d
Reason: AP produced no action for 3 consecutive steps
Wait 3 seconds, then click "Stop and go back" and verify the "Signal Lost" card shows a line starting with "Resume from" and ending with "(saved from session A)".

## Record the resume point ✓ passed (—)
md5: d411c4c94061d21f5176bba9393e0f62
Store the time shown after "Resume from" as 'resume_a'.

## Switch to the other session ✗ failed (—)
md5: 0545e0050995f6f196f2b313898ae3c4
Click the "Phone" device button in the top bar and verify the badge reads "Session B: Phone" and the card still shows "Resume from {{resume_a}} (saved from session A)".

## Resume on the second session ⏭ skipped
