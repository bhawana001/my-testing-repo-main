---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk/help-center-search?reset=true
max_steps: 40
tags: [zendesk, support-saas, crud]
---

# Zendeskly 30.4: Help center search

Catalog objective: search the help center and open an article.
Key assertion: a relevant article renders with a feedback widget.

## Search
Go to https://my-testing-repo-main.vercel.app/zendesk/help-center-search?reset=true, type "reset password" into the search box, click "Search", and verify "1 result for “reset password”" with the result "How to reset your password".

## Open the article
Click "How to reset your password" and verify the article heading "How to reset your password" with body text mentioning "Forgot password".

## Use the feedback widget
Verify the question "Was this article helpful?" with "Yes" and "No" buttons, click "Yes", and verify "Thanks for your feedback!"
