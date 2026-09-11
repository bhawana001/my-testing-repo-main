---
mode: testing
url: https://my-testing-repo-main.vercel.app/microsoft-teams/tab-app-load?reset=true
max_steps: 45
tags: [microsoft-teams, work-collab, custom]
---

# Teamz 36.4: Tab app load

Catalog objective: open a custom tab app in a channel.
Key assertion: the app loads inside the tab without error.

## Open the channel
Go to https://my-testing-repo-main.vercel.app/microsoft-teams/tab-app-load?reset=true and verify tabs "Posts", "Files" and "Sprint Board" with Posts selected.

## Open the app tab
Click "Sprint Board" and wait until the status badge changes from "Loading app…" to "App loaded · v2.3.1".

## Verify the app content
Verify the tab shows "Sprint 38 · Sep 14 – Sep 25" with To do, In progress and Done columns, and the message "Connected to Teamz as Demo User. No errors."
