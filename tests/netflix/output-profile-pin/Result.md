---
test: ../profile-pin_test.md
status: passed
started: 2026-09-13T19:14:45.409Z
duration_s: 127
session_id: cf80d348-e1b5-4c38-8378-10ce6b80865b
---

# Netflixy 47.3: Profile switch with PIN — Result

## Pick the locked profile ✓ passed (39.2s)
md5: b868d71061a32b4331813639785ef388
Go to https://my-testing-repo-main.vercel.app/netflix/profile-pin?reset=true, verify "Who's watching?" with Demo, Kids and Priya 🔒, click "Priya", and verify "Profile Lock is on for Priya".

## Wrong PIN ✓ passed (32.9s)
md5: 5bc8d162619df561be4626189df51b1e
Type "0000" into the PIN box, click "Unlock", and verify "Incorrect PIN. Try again."

## Correct PIN ✓ passed (30.8s)
md5: 4646750e6288edd342ba1c96f0050c7a
Type "1234", click "Unlock", and verify "Profile: Priya".

## Verify profile content ✓ passed (22.4s)
md5: f2f10fe39222796833d924345e17604d
Verify "Continue watching for Priya" lists "The Long Con", "Midnight Kitchen" and "Northern Line".
