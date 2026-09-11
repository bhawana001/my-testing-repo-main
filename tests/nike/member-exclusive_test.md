---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/member-exclusive?reset=true
max_steps: 40
tags: [nike, e-commerce, auth]
---

# Nyke 8.2: Member exclusive access

Catalog objective: log in as a member and open a member-only product.
Key assertion: the product is accessible and the buy button is enabled.

## Open as a guest
Go to https://my-testing-repo-main.vercel.app/nike/member-exclusive?reset=true and verify the product "Stride Runner 3 · Member Edition" shows the notice "This product is only available to Nyke Members" and the "Members only" button is disabled.

## Sign in
Click "Sign in to unlock", type "demo@evals.dev" into Email and "Demo123!" into Password, click "Sign in", and verify the top bar shows the badge "Member · Demo".

## Verify access
Verify the members-only notice is gone, size chips "US 8", "US 9" and "US 10" are shown, and the button now reads "Add to Bag".

## Buy
Click "US 9", verify the "Add to Bag" button is enabled, click it, and verify the message "Added Stride Runner 3 · Member Edition (US 9) to your bag." appears.
