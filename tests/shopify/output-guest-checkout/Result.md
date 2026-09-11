---
test: ../guest-checkout_test.md
status: passed
started: 2026-09-11T15:51:10.438Z
duration_s: 242
session_id: 908b134c-a7de-4365-9cc0-4a50832ab3f5
---

# Shopifly 2.1: Storefront guest checkout — Result

## Open the cart ✓ passed (26.8s)
md5: 6e815432ceb643399b873ee8c8fb9264
Go to https://my-testing-repo-main.vercel.app/shopify/guest-checkout?reset=true and verify the cart contains "Botanical Art Print A3" at "$35.00" and the "Total" row reads "$42.80" ($35.00 + $5.00 shipping + $2.80 tax).

## Go to checkout ✓ passed (37.3s)
md5: 5253eea5883fb80794f046168df645a1
Click "Proceed to checkout" and verify the "Contact and shipping" form is shown.

## Submit the empty form ✓ passed (33s)
md5: 47325785a265349d58e11f8a17b3b92b
Click "Continue to payment" without filling anything and verify the validation message "Enter a valid email address." appears.

## Fill in guest details ✓ passed (61.2s)
md5: c542095fd7a4efa1b7afe9e94e4c7b2e
Type "demo@evals.dev" into Email, "Demo" into First name, "User" into Last name, "1200 Market St" into Address, "San Francisco" into City, "94103" into ZIP / Postal code, then click "Continue to payment" and verify the "Payment" card form is shown.

## Pay with the test card ✓ passed (44.8s)
md5: d8ede1da6ac3bcf19c5b7c5f751d76af
Type "4242 4242 4242 4242" into Card number, "12/29" into Expiry, "123" into CVC, then click the "Pay $42.80" button and verify the text "Order placed" appears.

## Verify the thank-you page ✓ passed (35.2s)
md5: 7e4593ba4c936a7f2b3f72803938bb1c
Verify the heading "Thank you, Demo! Your order is confirmed" is shown with an Order number starting with "SF-" and the "Order total" reads "$42.80".
