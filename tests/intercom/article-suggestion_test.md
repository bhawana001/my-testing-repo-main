---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/article-suggestion?reset=true
max_steps: 40
tags: [intercom, support-saas, feed]
---

# Intercomm 31.3: Article suggestion in chat

Catalog objective: type a question and verify article suggestions appear.
Key assertion: the suggested article is relevant and opens in the messenger.

## Type a question
Go to https://my-testing-repo-main.vercel.app/intercom/article-suggestion?reset=true, type "how do I export my data" into "Type your question…" in the messenger, and verify "Suggested articles" lists "Exporting your data to CSV".

## Open the suggestion
Click "Exporting your data to CSV" and verify it opens inside the messenger panel with the heading "Exporting your data to CSV" and text mentioning "Export CSV".
