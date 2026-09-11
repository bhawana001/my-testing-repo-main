---
mode: testing
url: https://my-testing-repo-main.vercel.app/spotify/premium-upgrade?reset=true
max_steps: 45
tags: [spotify, streaming, checkout]
---

# Spotifly 48.1: Premium upgrade flow

Catalog objective: upgrade to Premium with a test payment.
Key assertion: ads are removed and the Premium badge is active.

## Free with ads
Go to https://my-testing-repo-main.vercel.app/spotify/premium-upgrade?reset=true and verify the "Free" badge, an "Advertisement" banner, and "Listening: With ads".

## Pick a plan
Click "Upgrade to Premium", keep "Individual" ($10.99/mo), click "Continue", and verify the payment form "Premium Individual · $10.99/month".

## Pay
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Buy Premium", and verify the Home screen returns.

## Verify premium
Verify the badge reads "Premium Individual", the advertisement banner is gone, and "Listening" reads "Ad-free ✓".
