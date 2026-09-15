---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike-clone-app?reset=true
max_steps: 45
tags: [nike, membership, gating]
---

# Nyke 8.2: Member exclusive access

Catalog objective: log in as a member and open a member-only product.
Key assertion: the product is accessible and the buy button is enabled.

## Confirm the product is gated when signed out
Click "Nyke Flyknit Elite — Member Exclusive" and verify the page shows "Members only" and a "Sign in to unlock" button instead of sizes.

## Sign in as a member
Click "Sign in to unlock", type "priya.nair@example.com" into Email, type "member2026" into Password, click "Sign in", and verify a welcome confirmation appears.

## Confirm the product unlocked
Verify the product page now shows a size grid and a "📏 Size guide" button rather than the members-only notice.

## Confirm it is buyable
Click size "US 10" and verify the "Add to Bag" button is enabled and a badge reads "Selected: US 10".
