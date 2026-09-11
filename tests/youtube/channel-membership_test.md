---
mode: testing
url: https://my-testing-repo-main.vercel.app/youtube/channel-membership?reset=true
max_steps: 45
tags: [youtube, streaming, checkout]
---

# YouTubely 49.4: Channel membership join

Catalog objective: join a channel membership tier with a test payment.
Key assertion: the badge is active and perks are listed.

## Choose a tier
Go to https://my-testing-repo-main.vercel.app/youtube/channel-membership?reset=true, click "Join" on Code Kitchen, keep "Insider" ($4.99/mo), click "Continue", and verify the payment form "Insider · $4.99/month".

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Join", and verify the badge "🏅 Member · Insider".

## Verify perks
Verify "Your perks" lists "Loyalty badge next to your name", "Custom emoji in chat", "Members-only posts" and "Early access to videos", and billing "$4.99/month · Visa •••• 4242".
