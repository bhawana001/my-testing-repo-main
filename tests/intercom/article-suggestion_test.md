---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom-clone-app/messenger?reset=true
max_steps: 40
tags: [intercom, support, help]
---

# Intercomm 31.3: Article suggestion in chat

Catalog objective: type a question and verify article suggestions appear.
Key assertion: the suggested article is relevant and opens inside the messenger.

## Type a question
Type "how do I change my billing plan" into the messenger box and verify a "Suggested articles" card appears.

## Verify the suggestion is relevant
Verify the suggestion listed is "Changing your billing plan".

## Open the article in the messenger
Click "Open" on "Changing your billing plan" and verify an article card appears with the body "Go to Billing, pick a plan, and confirm. Changes are prorated to the day."

## Return to the chat
Click "Back to the chat" and verify the article card is gone and the messenger box is still available.
