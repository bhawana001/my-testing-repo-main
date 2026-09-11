---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/background-play-entitlement?reset=true
max_steps: 45
tags: [youtube, streaming, auth]
---

# YouTubely 49.3: Premium background play

Catalog objective: verify the background playback entitlement on a Premium test account (mobile web equivalent).
Key assertion: the feature is active for Premium only.

## Free account
Go to https://my-testing-repo-main.vercel.app/youtube/background-play-entitlement?reset=true and verify "Free test account" shows Membership "Free", entitlement "false", and Background play "Premium feature 🔒".

## Free account in background
Click "Lock screen / switch app" and verify playback reads "Paused (app in background)".

## Premium account
Click "Premium test account", turn on the "Background play" switch, and verify entitlement "true" and Membership "Premium".

## Premium in background
Click "Lock screen / switch app" and verify playback reads "Playing (app in background)".
