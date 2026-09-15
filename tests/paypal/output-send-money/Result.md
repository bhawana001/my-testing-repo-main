---
test: ../send-money_test.md
status: passed
started: 2026-09-13T10:52:15.277Z
duration_s: 147
session_id: 57c838e2-1e26-46d1-8851-ed59570a90ce
---

# PayPally 10.3: Send money P2P — Result

## Choose the contact ✓ passed (33.9s)
md5: e8bc825eabbb504dcf9a29df1b7aaa31
Go to https://my-testing-repo-main.vercel.app/paypal/send-money?reset=true, choose "Priya Nair", click "Continue", and verify the "How much?" step.

## Amount and note ✓ passed (72.5s)
md5: 544a1823bbeca05f60d8a7b1becbf318
Type "40" into Amount and "Dinner" into "Add a note", click "Continue", and verify the review lists "Priya Nair", "40" and "Dinner".

## Send ✓ passed (18.6s)
md5: a88297c6741ad6604fcc56ea56adce6f
Click "Send Payment Now" and verify "You sent $40.00 to Priya Nair".

## Verify activity ✓ passed (20.2s)
md5: 31b467c4bcdbc688afaf375f41b042b4
Verify Recent activity shows "You paid Priya Nair" with note "Dinner" and "−$40.00".
