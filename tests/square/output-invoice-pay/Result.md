---
test: ../invoice-pay_test.md
status: passed
started: 2026-09-13T11:06:27.207Z
duration_s: 168
session_id: 025aaee2-7e3c-40b7-9d96-bfc5f7623a81
---

# Squarely 12.2: Invoice pay flow — Result

## Open the inbox ✓ passed (24s)
md5: 1240322f0382c842f8b2763658a9c2ef
Go to https://my-testing-repo-main.vercel.app/square/invoice-pay?reset=true and verify the inbox shows an email from "Harbor Landscaping via Squarely" for "Invoice INV-2026-0142" with the status badge "Unpaid".

## Open the invoice ✓ passed (38.6s)
md5: af8c86f2c1daaaaeafff9e57f1b7562d
Click the invoice email and verify the invoice page shows "Invoice INV-2026-0142", status "Unpaid" and "Amount due" of "$480.00".

## Pay the invoice ✓ passed (37.5s)
md5: 8b3076fe99ea3f22b513f5732e1e9183
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $480.00 now" button, and verify the heading "Invoice paid" appears.

## Verify the status flipped ✓ passed (42.1s)
md5: e12f852947971e65dc1ed6cbea632a2c
Verify the invoice status badge now reads "Paid", "Amount due" reads "$0.00" and "Paid on" reads "September 14, 2026".

## Verify the inbox reflects it ✓ passed (24.1s)
md5: 172d3f97671bbbbc0325b4039f0a2b8f
Click "Back to inbox" and verify the invoice email now shows the badge "Paid".
