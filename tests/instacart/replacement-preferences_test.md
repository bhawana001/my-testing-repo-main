---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart/replacement-preferences?reset=true
max_steps: 45
tags: [instacart, e-commerce, checkout]
---

# Instakart 7.2: Replacement preferences

Catalog objective: set a replacement choice on an out-of-stock-prone item.
Key assertion: the preference persists in the cart item detail.

## Open the cart
Go to https://my-testing-repo-main.vercel.app/instacart/replacement-preferences?reset=true and verify "Organic Strawberries 1 lb" is marked "Often out of stock" with "If out of stock:" set to "Best match (shopper picks)".

## Set a specific replacement
Select "Specific replacement: Berry Farms Strawberries 1 lb" in the strawberries' "If out of stock" dropdown.

## Verify after reload
Reload the page without the reset parameter, click "Item details" under the strawberries, and verify the detail shows "If out of stock" as "Specific replacement: Berry Farms Strawberries 1 lb".
