---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow-clone-app/knowledge?reset=true
max_steps: 40
tags: [servicenow, itsm, knowledge]
---

# ServiceNau 34.4: Knowledge article search

Catalog objective: search the knowledge base and open an article.
Key assertion: the article renders with a helpful vote widget.

## Search the knowledge base
Type "vpn" into the search box and verify "Articles found" reads 1 with a result for "KB0010044 — VPN drops every few minutes".

## Open the article
Click "KB0010044 — VPN drops every few minutes" and verify the article card shows "Category" of "Network" and the body "Switch the tunnel profile from split to full, restart the client, and retest for ten minutes."

## Verify the vote widget is present
Verify a card titled "Was this article helpful?" shows "Helpful" of 51, "Not helpful" of 7 and buttons "Yes" and "No".

## Cast a vote
Click "Yes" and verify a green banner reads "Thanks — marked as helpful.", "Helpful" now reads 52, and a badge reads "You marked this helpful".
