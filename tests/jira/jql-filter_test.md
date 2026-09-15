---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira-clone-app/search?reset=true
max_steps: 45
tags: [jira, work-collab, search]
---

# Jiira 41.3: JQL filter search

Catalog objective: run a JQL query and save the filter.
Key assertion: the results match the query and the filter is saved.

## Run a JQL query
Replace the JQL box with "project = ACME AND type = Bug" and click "Run query", then verify the Results card shows "Issues matched" of 2.

## Verify the results match the query
Verify the results table lists "ACME-101" and "ACME-103" and that every row has a Type of "Bug".

## Save the filter
Type "Open bugs" into "Filter name", click "Save filter", and verify a green banner reads "Filter “Open bugs” saved."

## Verify the saved filter
Verify the "Saved filters" card shows "Saved" of 1 with a filter named "Open bugs", the query "project = ACME AND type = Bug" and a badge reading "2 issues".
