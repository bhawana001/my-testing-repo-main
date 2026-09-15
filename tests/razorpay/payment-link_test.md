---
mode: testing
url: https://my-testing-repo-main.vercel.app/razorpay-clone-app/link?reset=true
max_steps: 40
tags: [razorpay, payments, links]
---

# Razorpie 11.4: Payment link

Catalog objective: open a payment link, complete a test payment and verify the paid state.
Key assertion: the link shows as paid and cannot be reused.

## Verify the unpaid link
Verify the page shows "Design consultation — 1 hour" at "₹3,500.00" with a badge reading "Awaiting payment".

## Pay the link
Type "4111 1111 1111 1111" into "Card number", click "Pay ₹3,500.00", and verify a green banner titled "This link has been paid" appears.

## Verify the paid state
Verify the badge now reads "Paid", the banner names payment "pay_R701kLm8Xq" on "2026-09-15" and "Amount paid" reads "₹3,500.00".

## Verify it cannot be reused
Verify the pay button is replaced by a disabled button reading "Link already paid", with the note that a payment link can only be used once.
