---
test: ../portal-ticket-view_test.md
status: passed
started: 2026-09-14T10:50:10.376Z
duration_s: 52
session_id: 693e00d5-d8f7-46bf-a77a-bfd23d1b55bb
---

# Freshdeskly 33.4: Customer portal ticket view — Result

## Log in ✓ passed (2.84s)
md5: 7947c841cb754d94037d5f2ea2111c3b
Go to https://my-testing-repo-main.vercel.app/freshdesk/portal-ticket-view?reset=true, type "demo@evals.dev" into Email and "Demo123!" into Password, click "Sign in", and verify "My tickets" lists #2051 "Can't log in to the mobile app" (Pending) and #2032 "Change billing email" (Resolved).

## Open the ticket ✓ passed (0.66s)
md5: 6c67172e605915c1882fc9b7fb690a03
Click "#2051" and verify the status badge reads "Pending · awaiting your reply".

## Verify replies ✓ passed (44.9s)
md5: acda9a2e22d77049a59be44e2304eb9e
Verify the conversation shows your message "The mobile app says my password is wrong but web login works." and the agent reply from "Priya Nair (Support)" mentioning "version 4.2.1".
