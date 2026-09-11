---
mode: testing
url: https://my-testing-repo-main.vercel.app/freshdesk/portal-ticket-view?reset=true
max_steps: 40
tags: [freshdesk, support-saas, auth]
---

# Freshdeskly 33.4: Customer portal ticket view

Catalog objective: log in to the portal and view ticket status.
Key assertion: status and replies are visible to the customer.

## Log in
Go to https://my-testing-repo-main.vercel.app/freshdesk/portal-ticket-view?reset=true, type "demo@evals.dev" into Email and "Demo123!" into Password, click "Sign in", and verify "My tickets" lists #2051 "Can't log in to the mobile app" (Pending) and #2032 "Change billing email" (Resolved).

## Open the ticket
Click "#2051" and verify the status badge reads "Pending · awaiting your reply".

## Verify replies
Verify the conversation shows your message "The mobile app says my password is wrong but web login works." and the agent reply from "Priya Nair (Support)" mentioning "version 4.2.1".
