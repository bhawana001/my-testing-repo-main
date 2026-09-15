---
test: ../policy-purchase_test.md
status: passed
started: 2026-09-13T12:41:03.658Z
duration_s: 129
session_id: 9a907507-1d8b-4312-9962-e20eaf5ae947
---

# Lemonaid 26.2: Policy purchase — Result

## Open the quote ✓ passed (28s)
md5: 77af6cd3790a361b1135ca112f496777
Go to https://my-testing-repo-main.vercel.app/lemonade/policy-purchase?reset=true and verify "Your quote" shows "$15.00/month", quote "Q-RENT-2201" and "Policy starts September 15, 2026".

## Pay ✓ passed (34.4s)
md5: 2513d66c94222accb9545b503134b17f
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click "Pay $15.00 and activate", and verify the badge "Policy active" and the heading "You're covered, Demo!" appear.

## Verify the policy ✓ passed (33.9s)
md5: d962877958785045edd54cd05b5fe61b
Verify "Policy number" reads "LP-2201-0915", "Status" reads "Active from September 15, 2026", and a "Policy documents" row with a "Download PDF" button is shown.

## Download the document ✓ passed (30.7s)
md5: bf1cd6dcbdaef8ec1f0365d80db32eab
Click "Download PDF" and verify the message "Downloaded lemonaid-policy-LP-2201-0915.pdf" with a byte count appears.
