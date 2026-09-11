---
mode: testing
url: https://my-testing-repo-main.vercel.app/jira/jql-filter?reset=true
max_steps: 45
tags: [jira, work-collab, crud]
---

# Jirah 41.3: JQL filter search

Catalog objective: run a JQL query and save the filter.
Key assertion: results match the query and the filter is saved.

## Invalid field
Go to https://my-testing-repo-main.vercel.app/jira/jql-filter?reset=true, type "project = WEB AND prio = High" into the JQL box, click "Search", and verify "Field 'prio' does not exist".

## Valid query
Replace the query with "project = WEB AND priority = High AND status != Done", click "Search", and verify "2 issues": WEB-121 (High, To Do) and WEB-125 (High, In Progress).

## Save the filter
Click "Save filter", type "High priority open", click "Save", and verify "Filter “High priority open” saved." and that it appears under Starred filters with that JQL.
