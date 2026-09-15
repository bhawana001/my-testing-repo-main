---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube-clone-app/memberships?reset=true
max_steps: 40
tags: [youtube, media, subscription]
---

# Yootube 49.4: Channel membership join

Catalog objective: join a channel membership tier with a test payment.
Key assertion: the badge is active and the perks are listed.

## Choose the tier
Choose the "🛠️ Engineer — $9.99/month" tier and verify "Total today" reads "$9.99".

## Pay and join
Type "4242 4242 4242 4242" into "Card number", click "Join", and verify a green banner titled "You are a member" says Engineer is active on Acme Robotics, charged $9.99 to •••• 4242.

## Verify the membership badge
Verify the "Your membership" card shows "Channel" of "Acme Robotics", "Tier" of "Engineer" and a badge reading "🛠️ Engineer member".

## Verify the perks are listed
Verify the perks list includes "Everything in Supporter", "Members-only videos", "Early access to build logs" and "Custom emoji".
