---
mode: testing
url: https://my-testing-repo-main.vercel.app/teams-clone-app/tabs?reset=true
max_steps: 40
tags: [microsoft-teams, work-collab, apps]
---

# Teemz 36.4: Tab app load

Catalog objective: open a custom tab app in a channel.
Key assertion: the app loads inside the tab without error.

## Pin the app as a tab
Click "Add to channel" on "Task Board" and verify the "Engineering tabs" card now shows a tab button labelled "Task Board".

## Verify the tab surface loaded
Verify the tab content shows a "Task Board loaded" badge with rows "Open" of 4, "In progress" of 2 and "Done this week" of 7.

## Add and switch to a second tab
Click "Add to channel" on "Team Wiki", then click the "Team Wiki" tab button, and verify the badge now reads "Team Wiki loaded".

## Verify the second app renders its own content
Verify the tab content shows "Onboarding" and "Runbooks" text and no error message.
