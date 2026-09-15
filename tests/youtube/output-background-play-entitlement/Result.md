---
test: ../background-play-entitlement_test.md
status: passed
started: 2026-09-15T07:13:29.037Z
duration_s: 173
session_id: 10fd78cf-79e3-44d8-92bb-623f5beb2ee6
---

# YouTubely 49.3: Premium background play — Result

## Free account ✓ passed (54.9s)
md5: 3626cfb0d34fbf4f53e6b11441ba23e3
Go to https://my-testing-repo-main.vercel.app/youtube/background-play-entitlement?reset=true and verify "Free test account" shows Membership "Free", entitlement "false", and Background play "Premium feature 🔒".

## Free account in background ✓ passed (31.7s)
md5: 262bebec7e2256d68977f161ce00ba07
Click "Lock screen / switch app" and verify playback reads "Paused (app in background)".

## Premium account ✓ passed (51.4s)
md5: efeae06c46c9623bf5588af7533fa68b
Click "Premium test account", turn on the "Background play" switch, and verify entitlement "true" and Membership "Premium".

## Premium in background ✓ passed (31s)
md5: 828e0004cad90b2876d8d5ab361a4dc9
Click "Lock screen / switch app" and verify playback reads "Playing (app in background)".
