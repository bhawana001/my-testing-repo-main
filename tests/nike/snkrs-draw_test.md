---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike-clone-app/launch?reset=true
max_steps: 45
tags: [nike, launch, draw]
---

# Nyke 8.3: SNKRS draw entry

Catalog objective: enter a draw on a launch product.
Key assertion: the entry-confirmed state is shown.

## Confirm the launch product
Verify the launch page shows "Nyke Air Meridian 'First Light'" at "$210.00" with a badge reading "Draw closes September 20, 2026 at 9:00 AM".

## Confirm entry requires membership
Click "Enter draw" and verify an error appears reading "Sign in to your Nyke account to enter."

## Sign in
Click "Sign in", type "priya.nair@example.com" into Email, type "member2026" into Password, and click "Sign in", then verify a "Member" badge is shown.

## Confirm a size is required
Click "Enter draw" and verify an error appears reading "Choose the size you want."

## Enter the draw
Click "US 10", click "Enter draw", and verify the page shows "You're in the draw" with an entry id starting with "DRAW-", status "Entered — awaiting draw" and size "US 10".
