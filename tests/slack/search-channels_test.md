---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack-clone-app/search?reset=true
max_steps: 40
tags: [slack, work-collab, search]
---

# Slaick 35.3: Search across channels

Catalog objective: search a keyword, then filter the results to a single channel.
Key assertion: results are scoped to the channel and the match is highlighted.

## Search every channel
Type "deploy" into the "Search term" box, leave "In channel" on "All channels", click "Search", and verify the Results card reads "4 results across all channels".

## Narrow to one channel
Select "#release" in the "In channel" dropdown, click "Search", and verify the Results card reads "1 result in #release".

## Verify the scoped result
Verify the single result carries the channel badge "#release", the author "Dan Okafor", and the text "Build 4.19 is green, starting the deploy now."

## Verify the keyword is highlighted
Verify the word "deploy" inside that result is wrapped in a highlight.
