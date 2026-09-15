---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk-clone-app/help?reset=true
max_steps: 40
tags: [zendesk, support, knowledge]
---

# Zendisk 30.4: Help centre search

Catalog objective: search the help centre and open an article.
Key assertion: the relevant article renders with a feedback widget.

## Search for a topic
Type "refund" into "Search" and verify the result count narrows to the matching article.

## Open the article
Click "How refunds are processed" and verify the article body explains that refunds return to the original payment method and card refunds take 5 working days.

## Verify the feedback widget
Verify a card titled "Was this article helpful?" is shown with "👍 Yes" and "👎 No" buttons and "Found helpful by" of "128 of 134 people".

## Cast a vote
Click "👍 Yes" and verify the Yes button becomes the selected option.
