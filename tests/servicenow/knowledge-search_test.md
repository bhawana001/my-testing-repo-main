---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/knowledge-search?reset=true
max_steps: 45
tags: [servicenow, itsm, crud]
---

# ServiceNowly 34.4: Knowledge article search

Catalog objective: search the knowledge base and open an article.
Key assertion: the article renders with a helpful-vote widget.

## Search
Go to https://my-testing-repo-main.vercel.app/servicenow/knowledge-search?reset=true, type "vpn" into "Search knowledge", click "Search", and verify "1 article found" listing "Connect to the corporate VPN".

## Open the article
Click "Connect to the corporate VPN" and verify the heading "Connect to the corporate VPN" with ID "KB0010021" and body text mentioning "client 5.4".

## Vote
Click "Yes" next to "Helpful?" and verify "Thanks! You rated this article helpful."
