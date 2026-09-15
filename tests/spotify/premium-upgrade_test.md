---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify-clone-app/premium?reset=true
max_steps: 45
tags: [spotify, media, subscription]
---

# Spotifly 48.1: Premium upgrade flow

Catalog objective: upgrade to premium with a test payment.
Key assertion: ads are removed and the premium badge is active.

## Verify the free account
Verify the "Current plan" card shows "Plan" of "Free", "Ads" of "Ad-supported" and a badge reading "Free account".

## Pay for Premium
Choose "Premium Individual", type "4242 4242 4242 4242" into "Card number", verify "Total today" reads "$11.99", then click "Start Premium".

## Verify the upgrade
Verify a green banner titled "Welcome to Premium" says Premium Individual is active, charged $11.99 to •••• 4242 with receipt "SPF-7300", and the badge now reads "Premium active".

## Verify ads are gone on the player
Verify the "What changed" card shows "Ads" of "Removed", then go to https://my-testing-repo-main.vercel.app/spotify-clone-app and verify the player shows "Plan" of "Premium Individual" with an "Ad-free" badge.
