---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/snkrs-draw?reset=true
max_steps: 45
tags: [nike, e-commerce, custom]
---

# Nyke 8.3: SNKRZ draw entry

Catalog objective: enter a draw on a launch product.
Key assertion: the entry confirmed state is shown.

## Open the launch
Go to https://my-testing-repo-main.vercel.app/nike/snkrs-draw?reset=true and verify "Air Stride '26 “Volt”" with the badge "Draw · Launches Sep 18" and an "Enter Draw" button.

## Enter without a size
Click "Enter Draw" and verify "Select a size to enter the draw."

## Pick a size and open confirmation
Click "US 10", click "Enter Draw", and verify a "Confirm your entry" dialog showing Size "US 10" and "Visa •••• 4242".

## Submit the entry
Click "Submit entry" and verify "You're in the draw" with Size "US 10".

## Verify after reload
Reload the page without the reset parameter and verify "You're in the draw" is still shown and the button reads "Entered" and is disabled.
