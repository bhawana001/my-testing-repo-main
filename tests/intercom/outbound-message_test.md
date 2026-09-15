---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom-clone-app/outbound?reset=true
max_steps: 40
tags: [intercom, support, marketing]
---

# Intercomm 31.4: Outbound message display

Catalog objective: verify a targeted outbound message shows on the matching page.
Key assertion: the message displays with a working call to action.

## Verify the message shows on the matching page
With "Pricing page" selected and the plan on "Pro", verify "Messages shown on this page" reads 1 and the visitor view shows "Not sure which plan fits?" with the body "Book 15 minutes with us and we will size it with you."

## Verify it does not show on a non-matching page
Select "Home page" in "Page they are on" and verify "Messages shown on this page" reads 0 with the note that no outbound message targets this page and plan.

## Verify the audience rule is respected
Select "Pricing page" again, then select "Free" in "Their plan", and verify "Messages shown on this page" reads 0.

## Verify the call to action works
Select "Pro" in "Their plan", click the "Book a call" button, and verify a green banner reads "“Book a call” clicked — the click is recorded against Not sure which plan fits?" and the CTA clicks card shows "Clicks" of 1.
