---
test: ../currency-conversion_test.md
status: passed
started: 2026-09-13T10:57:10.738Z
duration_s: 139
session_id: adfc945f-8d6a-4da5-8ae2-10009f2a63a2
---

# PayPally 10.5: Currency conversion display — Result

## Enter the amount ✓ passed (56.1s)
md5: 5718ecd8e134232824cfbda99a4c38e1
Go to https://my-testing-repo-main.vercel.app/paypal/currency-conversion?reset=true, keep "200" in "You send (USD)" to Asha Rao (India), click "Continue", and verify "Review before you send".

## Verify rate and amount before confirming ✓ passed (51.8s)
md5: f1046cb112651217d29224052be40805
Verify "Exchange rate" reads "1 USD = 81.54 INR" with the note about a 2% spread on 83.20, "Transfer fee" "$4.99", "Total you pay" "$204.99", and "Asha receives" "₹16,308.00", while the "Send now" button has not been clicked yet.

## Confirm ✓ passed (29s)
md5: 6f28de9969ff3ab681b7a5d624f82e7b
Click "Send now" and verify "You sent $200.00 · Asha receives ₹16,308.00".
