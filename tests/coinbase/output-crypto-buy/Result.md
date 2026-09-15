---
test: ../crypto-buy_test.md
status: passed
started: 2026-09-13T11:55:39.637Z
duration_s: 195
session_id: 212e775c-21db-4ec3-a289-51cab3d02680
---

# Coinbayse 18.1: Crypto buy with card — Result

## Open buy ✓ passed (35.1s)
md5: d8881dba3e593a5d96040255c25a73e2
Go to https://my-testing-repo-main.vercel.app/coinbase/crypto-buy?reset=true and verify "BTC balance" reads "0.01250000 BTC", Amount is 50, "Coinbayse fee" reads "$0.99" and "You'll get" reads "0.00075400 BTC".

## Preview ✓ passed (73.7s)
md5: 96f3427394fe896e0cd2525a550b3b40
Click "Preview buy" and verify the summary lists "Buy 0.00075400 BTC", "Price $65,000.00" and "Total $50.00" with a card form.

## Pay with the test card ✓ passed (41.4s)
md5: a23cc0cd934db76c0c34807265c6aa94
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Buy now · $50.00", and verify "You bought 0.00075400 BTC" with the badge "Purchase complete".

## Verify the credited balance ✓ passed (42.9s)
md5: 9562190eba47661dcb24be4535c48979
Verify "New BTC balance" reads "0.01325400 BTC" and the top bar BTC balance also reads "0.01325400 BTC".
