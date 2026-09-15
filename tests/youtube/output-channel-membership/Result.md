---
test: ../channel-membership_test.md
status: passed
started: 2026-09-15T07:16:38.170Z
duration_s: 155
session_id: 271147d8-f8df-45a0-add9-4c443e807052
---

# YouTubely 49.4: Channel membership join — Result

## Choose a tier ✓ passed (59.8s)
md5: 1d1c20c9539aa77ef7b6d69a91904869
Go to https://my-testing-repo-main.vercel.app/youtube/channel-membership?reset=true, click "Join" on Code Kitchen, keep "Insider" ($4.99/mo), click "Continue", and verify the payment form "Insider · $4.99/month".

## Pay ✓ passed (46.6s)
md5: 590ba2365ee4fb76e7e999b8bc2a79ed
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Join", and verify the badge "🏅 Member · Insider".

## Verify perks ✓ passed (46.6s)
md5: 6ad590d586e11e4bae096618deccfceb
Verify "Your perks" lists "Loyalty badge next to your name", "Custom emoji in chat", "Members-only posts" and "Early access to videos", and billing "$4.99/month · Visa •••• 4242".
