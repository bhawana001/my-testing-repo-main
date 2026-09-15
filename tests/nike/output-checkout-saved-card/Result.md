---
test: ../checkout-saved-card_test.md
status: failed
started: 2026-09-15T10:48:22.831Z
duration_s: 100
session_id: d468e71a-4ba6-491a-b9d1-280df79e6218
---

# Nyke 8.4: Checkout with saved card — Result

## Add a shoe in a specific size ✓ passed (42s)
md5: 7d48e77769be633daddfd9d653b7a706
Click "Nyke Court Classic Low", click size "US 9", click "Add to Bag", and verify a confirmation appears for the added size.

## Open the bag ✗ failed (54.1s)
md5: af9bd92e04328ce49d5cc04f94d890e0
Reason: AP produced no action for 3 consecutive steps — bug verdict: Agent stopped after partial bag verification [automation_bug/agent_misstep, confidence 0.98]
Click the "Bag" link in the header and verify the bag shows "Nyke Court Classic Low" with "White / Gum · Size US 9" and a subtotal of "$94.99".

## Confirm the saved card requires sign-in ✓ passed (—)
md5: 5100b1b48e192eb68f00d8f7b4fc397f
Verify the summary shows "Sign in to use your saved card" with a "Sign in" button.

## Sign in as the member ✓ passed (—)
md5: f5fc0f1003fdf929950461d4ed24dab6
Click "Sign in", type "priya.nair@example.com" into Email, type "member2026" into Password, click "Sign in", and verify the saved payment card shows "Visa ending in 4242 · exp 12/34".

## Place the order with the saved card ✓ passed (—)
md5: 7e1f2c01439e95034403fde1cecbe889
Click "Place order — $102.83" and verify the confirmation shows "Order confirmed" with "Size US 9" and a total of "$102.83".
