---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike-clone-app?reset=true
max_steps: 50
tags: [nike, checkout, saved-card]
---

# Nyke 8.4: Checkout with saved card

Catalog objective: check out a bag item using saved payment details.
Key assertion: order confirmation shows the correct size and price.

## Add a shoe in a specific size
Click "Nyke Court Classic Low", click size "US 9", click "Add to Bag", and verify a confirmation appears for the added size.

## Open the bag
Click the "Bag" link in the header and verify the bag shows "Nyke Court Classic Low" with "White / Gum · Size US 9" and a subtotal of "$94.99".

## Confirm the saved card requires sign-in
Verify the summary shows "Sign in to use your saved card" with a "Sign in" button.

## Sign in as the member
Click "Sign in", type "priya.nair@example.com" into Email, type "member2026" into Password, click "Sign in", and verify the saved payment card shows "Visa ending in 4242 · exp 12/34".

## Place the order with the saved card
Click "Place order — $102.83" and verify the confirmation shows "Order confirmed" with "Size US 9" and a total of "$102.83".
