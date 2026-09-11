---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/search-channels?reset=true
max_steps: 45
tags: [slack, work-collab, crud]
---

# Slacky 35.3: Search across channels

Catalog objective: search a keyword and filter to a channel.
Key assertion: results are scoped to the channel with highlights.

## Search everywhere
Go to https://my-testing-repo-main.vercel.app/slack/search-channels?reset=true, type "deploy" into "Search Acme Inc", click "Search", and verify "4 results for “deploy”" across #general, #release-train and #design.

## Filter to a channel
Select "In: #release-train" and verify "2 results for “deploy” in #release-train".

## Verify scope and highlights
Verify both results are labelled "#release-train" ("Deploy 2026.09.11 is green on staging." and "Kicking off the production deploy now.") and the word "deploy" is highlighted in each.
