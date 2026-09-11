---
test: ../playback-resume_test.md
status: failed
started: 2026-09-11T11:41:45.728Z
duration_s: 241
session_id: d7ff16d2-83d3-4845-a771-bc40e9559027
---

# Netflixy 47.2: Playback start and resume — Result

## Open continue watching ✓ passed (42.8s)
md5: e7f96bdf718b97610d19ef6434629853
Go to https://my-testing-repo-main.vercel.app/netflix/playback-resume?reset=true and verify the heading "Continue watching for Demo" is visible, the badge says "Session A: Living room TV", and the title "Signal Lost" shows "Not started".

## Play the title ✓ passed (40s)
md5: 8b02261d704cbe10d774d44bbdfa7a98
Click the "Play" button and verify the player shows "Signal Lost" with a time counter that starts increasing from 0:00.

## Stop after a few seconds ✓ passed (46.8s)
md5: 3cdd04e8cddda5f6aa3bc4e3ecf80f43
Wait 3 seconds, then click "Stop and go back". Store the resume time shown in the text "Resume from" as 'resume_a'.

## Switch to the other session ✓ passed (41.5s)
md5: d411c4c94061d21f5176bba9393e0f62
Click the "Phone" device button in the top bar. Verify the badge now reads "Session B: Phone" and the title shows "Resume from {{resume_a}}" with "(saved from session A)".

## Resume on the second session ✗ failed (66.6s)
md5: 0545e0050995f6f196f2b313898ae3c4
Reason: Final verification failed: "After clicking the "Resume" button, the player time counter starts at {{resume_a}} (within 5 seconds of it) rather than 0:00." — bug verdict: Resume-time assertion checks an already advancing counter [automation_bug/timing_sync, confidence 0.91]
Click the "Resume" button and verify the player time counter starts at {{resume_a}} (within 5 seconds of it) rather than 0:00.
