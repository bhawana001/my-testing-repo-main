---
mode: testing
url: https://my-testing-repo-main.vercel.app/square/invoice-pay?reset=true
max_steps: 40
tags: [square, payments-infra, checkout]
---

# Squarely 12.2: Invoice pay flow

Catalog objective: open an emailed invoice and pay it online.
Key assertion: the invoice status flips to paid.

## Open the inbox
Go to https://my-testing-repo-main.vercel.app/square/invoice-pay?reset=true and verify the inbox shows an email from "Harbor Landscaping via Squarely" for "Invoice INV-2026-0142" with the status badge "Unpaid".

## Open the invoice
Click the invoice email and verify the invoice page shows "Invoice INV-2026-0142", status "Unpaid" and "Amount due" of "$480.00".

## Pay the invoice
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, click the "Pay $480.00 now" button, and verify the heading "Invoice paid" appears.

## Verify the status flipped
Verify the invoice status badge now reads "Paid", "Amount due" reads "$0.00" and "Paid on" reads "September 14, 2026".

## Verify the inbox reflects it
Click "Back to inbox" and verify the invoice email now shows the badge "Paid".
