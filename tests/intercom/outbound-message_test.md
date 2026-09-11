---
mode: testing
url: https://my-testing-repo-main.vercel.app/intercom/outbound-message?reset=true
max_steps: 40
tags: [intercom, support-saas, custom]
---

# Intercomm 31.4: Outbound message display

Catalog objective: verify a targeted outbound message shows on a matching page.
Key assertion: the message displays with a working CTA.

## Non-matching page
Go to https://my-testing-repo-main.vercel.app/intercom/outbound-message?reset=true and verify the simulated page is "/home", the visitor plan is "Free", "Matches current visitor" reads "No", and no "Upgrade to Pro" message is shown.

## Matching page
Click "/pricing" and verify "Matches current visitor" reads "Yes" and a message "Upgrade to Pro and save 20% 🎉" with a "See Pro plans" button appears in the bottom-right.

## Use the CTA
Click "See Pro plans" and verify the message closes, the confirmation "You followed the message's CTA." appears, and the Pro plan card shows "20% discount applied: $23.20/mo".
