---
test: ../search-channels_test.md
status: passed
started: 2026-09-13T14:05:23.077Z
duration_s: 130
session_id: 1e13e03f-2d69-4863-a014-d8b28751aa24
---

# Slacky 35.3: Search across channels — Result

## Search everywhere ✓ passed (60.8s)
md5: 8092a03138a0d8fb3994018729595a12
Go to https://my-testing-repo-main.vercel.app/slack/search-channels?reset=true, type "deploy" into "Search Acme Inc", click "Search", and verify "4 results for “deploy”" across #general, #release-train and #design.

## Filter to a channel ✓ passed (33.5s)
md5: 618a81b139252b9bfe1e04547cd1b161
Select "In: #release-train" and verify "2 results for “deploy” in #release-train".

## Verify scope and highlights ✓ passed (32.9s)
md5: 6127ff8b7e6f4f6c60b765010df396bf
Verify both results are labelled "#release-train" ("Deploy 2026.09.11 is green on staging." and "Kicking off the production deploy now.") and the word "deploy" is highlighted in each.
