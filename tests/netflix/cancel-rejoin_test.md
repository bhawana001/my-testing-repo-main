---
mode: testing
url: https://my-testing-repo-main.vercel.app/netflix/cancel-rejoin?reset=true
max_steps: 45
tags: [netflix, streaming, wizard]
---

# Netflixy 47.5: Cancel and rejoin

Catalog objective: cancel the membership and verify the end date, then restart.
Key assertion: access-until date is shown and restart works.

## Cancel
Go to https://my-testing-repo-main.vercel.app/netflix/cancel-rejoin?reset=true, verify Status "Active", click "Cancel Membership", and verify "Your membership will end on October 14, 2026."

## Finish cancellation
Click "Finish Cancellation" and verify Status "Cancelled · access until October 14, 2026" and "You can still watch until October 14, 2026."

## Restart
Click "Restart Membership" and verify Status "Active" and "Welcome back! Your membership continues. Next billing date: October 14, 2026."
