---
test: ../store-pickup_test.md
status: passed
started: 2026-09-11T16:08:57.288Z
duration_s: 312
session_id: 48aa2ff1-5147-4f3b-9684-e635aaa3752a
---

# Walmartly 4.1: Store pickup selection — Result

## Open the cart and proceed ✓ passed (81.3s)
md5: 4f574dc1f638acdd383d42bfc758bf49
Go to https://my-testing-repo-main.vercel.app/walmart/store-pickup?reset=true, verify the cart contains the Vista 55-inch 4K TV at "$449.00", then click "Proceed to checkout" and verify the card "How do you want to get your order?" is shown.

## Choose free pickup ✓ passed (45.5s)
md5: 61c840f3901b44af03657efbfa3eeee7
Click the "Free pickup" option and verify a "Store" dropdown showing "Walmartly Supercenter, Market St · 1.2 mi" and "Pickup time" slots appear.

## Try continuing without a slot ✓ passed (31.9s)
md5: e859f719f468440ec1c279491bdebd64
Click "Continue to payment" and verify the message "Choose a pickup time." is shown.

## Pick a slot and continue ✓ passed (74.8s)
md5: a81e6fd7bb5344befd5944c56f7ac272
Click the "Today 6:00–7:00 PM" slot, click "Continue to payment", and verify the order summary shows "Pickup: Walmartly Supercenter, Market St · Today 6:00–7:00 PM" and the "Shipping" row reads "Free".

## Pay and verify the summary ✓ passed (76.7s)
md5: 411686396a5afa716c89f1d0afb2fc23
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the Pay button, and verify the confirmation lists "Pickup store" as "Walmartly Supercenter, Market St" and "Pickup time" as "Today 6:00–7:00 PM".
