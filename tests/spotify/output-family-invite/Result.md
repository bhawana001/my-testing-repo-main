---
test: ../family-invite_test.md
status: passed
started: 2026-09-13T19:31:23.931Z
duration_s: 141
session_id: 14e860c2-2a0b-40f3-a285-1dd691b07cdb
---

# Spotifly 48.4: Family plan invite — Result

## Open the family plan ✓ passed (26.4s)
md5: 3801e1297610e16b6f9a0e9436acf83d
Go to https://my-testing-repo-main.vercel.app/spotify/family-invite?reset=true and verify "Premium Family · 1 of 6 accounts".

## Invalid email ✓ passed (40.2s)
md5: 6d731b3ec67446a59d683ff2b0fed1aa
Type "sam@acme" into Email address, click "Send invite", and verify "Enter a valid email address."

## Send the invite ✓ passed (34s)
md5: 882e29c9e9546da10c7ae0d35c844ec1
Change the email to "sam@acme.test", click "Send invite", and verify "2 of 6 accounts".

## Verify pending state and email ✓ passed (38.6s)
md5: 870d83c9cac4fdd4fa1c861058e5b522
Verify sam@acme.test is listed as "Invite sent · Pending" and Sent emails shows "To: sam@acme.test" with "Demo User invited you to Spotifly Premium Family".
