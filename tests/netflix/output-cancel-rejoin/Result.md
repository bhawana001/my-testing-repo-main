---
test: ../cancel-rejoin_test.md
status: passed
started: 2026-09-13T19:19:52.415Z
duration_s: 133
session_id: d117b6cb-54ec-43be-a00d-f91675083f26
---

# Netflixy 47.5: Cancel and rejoin — Result

## Cancel ✓ passed (61.7s)
md5: e5f891d4d36329b816311a1e71eff1cc
Go to https://my-testing-repo-main.vercel.app/netflix/cancel-rejoin?reset=true, verify Status "Active", click "Cancel Membership", and verify "Your membership will end on October 14, 2026."

## Finish cancellation ✓ passed (34.5s)
md5: 8f3155a2529ff8d9b328464613b65705
Click "Finish Cancellation" and verify Status "Cancelled · access until October 14, 2026" and "You can still watch until October 14, 2026."

## Restart ✓ passed (35.1s)
md5: c8efe3b2a5830e90ff66228904fa3544
Click "Restart Membership" and verify Status "Active" and "Welcome back! Your membership continues. Next billing date: October 14, 2026."
