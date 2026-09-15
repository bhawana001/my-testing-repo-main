---
mode: testing
url: https://my-testing-repo-main.vercel.app/monday-clone-app/automations?reset=true
max_steps: 45
tags: [monday, work-collab, automation]
---

# Mondee 42.2: Automation recipe

Catalog objective: set a status-change notify automation and trigger it.
Key assertion: a notification is generated on the change.

## Create the recipe
Select "Launch plan" in "Board", select "Done" in "When status changes to", select "Priya Nair" in "Notify", click "Create automation", and verify a green banner reads "Recipe saved on Launch plan: When status changes to Done, notify Priya Nair".

## Verify the recipe is active
Verify the "Active recipes" card shows "Recipes" of 1 with an "active" badge on the "Launch plan" row.

## Trigger it with a status change
Select "Print the banners (Working on it)" in "Item", select "Done" in "New status", and click "Change the status".

## Verify the notification was generated
Verify a green banner reads "1 notification generated — Priya Nair notified." and the Notifications card shows "Notifications generated" of 1 with an entry for "Priya Nair" reading "“Print the banners” changed to Done on Launch plan".
