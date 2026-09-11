---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify/family-invite?reset=true
max_steps: 45
tags: [spotify, streaming, wizard]
---

# Spotifly 48.4: Family plan invite

Catalog objective: invite a member to the Family plan.
Key assertion: the invite email is sent and a pending state is shown.

## Invalid email
Go to https://my-testing-repo-main.vercel.app/spotify/family-invite?reset=true, verify "Premium Family · 1 of 6 accounts", type "sam@acme" into Email address, click "Send invite", and verify "Enter a valid email address."

## Send the invite
Change the email to "sam@acme.test", click "Send invite", and verify "2 of 6 accounts".

## Verify pending state and email
Verify sam@acme.test is listed as "Invite sent · Pending" and Sent emails shows "To: sam@acme.test" with "Demo User invited you to Spotifly Premium Family".
