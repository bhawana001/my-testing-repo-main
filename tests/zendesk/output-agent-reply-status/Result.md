---
test: ../agent-reply-status_test.md
status: passed
started: 2026-09-14T10:41:45.586Z
duration_s: 128
session_id: 55e1f982-6493-48c6-83a6-07a0de6ba564
---

# Zendeskly 30.2: Agent reply and status — Result

## Open the ticket as an agent ✓ passed (27.3s)
md5: cc85349575243e043fd49a5df45f7a37
Go to https://my-testing-repo-main.vercel.app/zendesk/agent-reply-status?reset=true and verify ticket "#1042 · Wrong billing address on invoice" with status "Open" and a message from Maria Chen.

## Reply and submit as Pending ✓ passed (32.4s)
md5: be6c4d01d99bf558781dfc13ce110cf0
Type "We've corrected the address and reissued the invoice." into the reply box, keep "Submit as Pending" selected, click "Submit as Pending", and verify the status badge reads "Pending".

## Check the customer view ✓ passed (64.5s)
md5: 00920baf0eba3a5ef2734bd7069d34df
Click "Customer portal" in the top bar and verify request #1042 shows the status "Awaiting your reply" and the reply "We've corrected the address and reissued the invoice." from Demo User.
