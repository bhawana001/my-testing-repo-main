---
mode: testing
url: https://my-testing-repo-main.vercel.app/phonepe/autopay-mandate?reset=true
max_steps: 40
tags: [phonepe, consumer-fintech, wizard]
---

# PhonePay 21.2: Autopay mandate setup

Catalog objective: create a UPI autopay mandate for a service (mobile web equivalent).
Key assertion: the mandate is active with its cap amount.

## Open AutoPay
Go to https://my-testing-repo-main.vercel.app/phonepe/autopay-mandate?reset=true and verify "Your mandates" lists "Spotifly Premium" (up to ₹119.00 · Monthly) and the form is prefilled with Service "Netflixy", maximum ₹649 and Monthly.

## Continue
Click "Continue" and verify the summary shows "Netflixy" and "₹649.00 · Monthly" with a UPI PIN field.

## Authorise
Type "1234" into UPI PIN, click "Authorise mandate", and verify the message "AutoPay for Netflixy is active. Max ₹649.00 monthly." appears.

## Verify the mandate
Verify "Your mandates" now lists "Netflixy" with "Up to ₹649.00 · Monthly" and the status "Active".
