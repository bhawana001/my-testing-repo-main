---
test: ../tab-app-load_test.md
status: passed
started: 2026-09-14T11:01:11.890Z
duration_s: 115
session_id: 0440603d-b34b-419f-a27e-335400a78822
---

# Teamz 36.4: Tab app load — Result

## Open the channel ✓ passed (21.2s)
md5: bd18372f30099c9696abd6a4be417999
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/tab-app-load?reset=true and verify tabs "Posts", "Files" and "Sprint Board" with Posts selected.

## Open the app tab ✓ passed (33.1s)
md5: 2866d1c03c840f35f64f27b89baaefe3
Click "Sprint Board" and wait until the status badge changes from "Loading app…" to "App loaded · v2.3.1".

## Verify the app content ✓ passed (57.9s)
md5: 47f866913a7bb21577abdf2f0f59b381
Verify the tab shows "Sprint 38 · Sep 14 – Sep 25" with To do, In progress and Done columns, and the message "Connected to Teamz as Demo User. No errors."
