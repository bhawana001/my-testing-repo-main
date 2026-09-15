---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube-clone-app/premium?reset=true
max_steps: 40
tags: [youtube, media, entitlement]
---

# Yootube 49.3: Premium background play

Catalog objective: verify the background playback entitlement flag on a premium account.
Key assertion: the feature is active for premium only.

## Verify the free account is not entitled
Verify "Premium" reads "Not active" and the "Background play" row carries a "Not entitled" badge with "Background play entitlement" of "false".

## Verify the free features that are still available
Verify the "Comments" row carries an "Active" badge, since it is not premium only.

## Subscribe to Premium
Type "4242 4242 4242 4242" into "Card number", click "Start Premium", and verify a green banner reads "Premium is active — background play is now entitled."

## Verify the entitlement flipped
Verify "Premium" reads "Active", the "Background play" row carries an "Active" badge, and "Background play entitlement" reads "true".
