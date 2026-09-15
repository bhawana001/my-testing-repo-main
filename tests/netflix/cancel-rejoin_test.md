---
mode: testing
url: https://my-testing-repo-main.vercel.app/stream-clone-app/signup?reset=true
max_steps: 55
tags: [netflix, streaming, subscription]
---

# StreamFlix 47.5: Cancel and rejoin

Catalog objective: cancel the membership, verify the end date, then restart.
Key assertion: access-until is shown and restarting works.

## Start a membership
Choose "Standard — $15.49/month", type "priya@example.test" into "Email", type "4242 4242 4242 4242" into "Card number", and click "Start membership".

## Open the account page
Go to https://my-testing-repo-main.vercel.app/stream-clone-app/account and verify "Status" reads "active" with "Plan" of "Standard · $15.49/month".

## Cancel it
Click "Cancel membership", verify a dialog titled "Cancel your membership?" opens, and click the confirm button.

## Verify the end date and restart
Verify an amber banner titled "Your membership is ending" says you have access until "October 9, 2026", then click "Restart membership" and verify "Status" reads "active" again with the ending banner gone.
