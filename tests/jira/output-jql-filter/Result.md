---
test: ../jql-filter_test.md
status: passed
started: 2026-09-13T18:23:56.855Z
duration_s: 126
session_id: 7c2911c9-fae5-49ca-8f67-393f89d2cd17
---

# Jirah 41.3: JQL filter search — Result

## Invalid field ✓ passed (36.5s)
md5: 447cd6fbe946b5b9fba095fd161b499d
Go to https://my-testing-repo-main.vercel.app/jira/jql-filter?reset=true, type "project = WEB AND prio = High" into the JQL box, click "Search", and verify "Field 'prio' does not exist".

## Valid query ✓ passed (43.2s)
md5: 2234d4a585613f2bb6011a34271d73e5
Replace the query with "project = WEB AND priority = High AND status != Done", click "Search", and verify "2 issues": WEB-121 (High, To Do) and WEB-125 (High, In Progress).

## Save the filter ✓ passed (43.7s)
md5: 56c4d285fea4c87fd09dc3d081d6e379
Click "Save filter", type "High priority open", click "Save", and verify "Filter “High priority open” saved." and that it appears under Starred filters with that JQL.
