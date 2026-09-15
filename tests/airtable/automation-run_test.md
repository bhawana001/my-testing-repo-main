---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable-clone-app/automations?reset=true
max_steps: 40
tags: [airtable, work-collab, automation]
---

# Airtabel 39.4: Automation run

Catalog objective: trigger an automation with a record change.
Key assertion: the automation action is executed and logged.

## Verify the automation is configured and on
Verify the "Configured automations" card lists "Notify on Shipped" with the trigger "When stage becomes Shipped" and the action "Post to #release and email the owner", toggled On.

## Verify nothing has run yet
Verify the "Run history" card shows "Runs logged" of 0.

## Trigger it with a record change
Select "rec001 — Checkout redesign (In progress)" in "Record", select "Shipped" in "New stage", and click "Apply the change".

## Verify the run was logged
Verify "Runs logged" now reads 1 and the history shows "Notify on Shipped" with the detail "Post to #release and email the owner — Checkout redesign moved In progress → Shipped" and a "Succeeded" badge.
