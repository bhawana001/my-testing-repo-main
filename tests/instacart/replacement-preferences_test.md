---
mode: testing
url: https://my-testing-repo-main.vercel.app/instacart-clone-app?reset=true
max_steps: 40
tags: [instacart, grocery, replacements]
---

# Instacrate 7.2: Replacement preferences

Catalog objective: set a replacement choice on an item that often goes out of stock.
Key assertion: the preference persists in the cart item detail.

## Add a flaky item
Click "Add" on "Baby Spinach, 5 oz" and verify the carts panel shows "Baby Spinach, 5 oz".

## Choose a specific replacement
Select "Choose a specific replacement" in the "If it's out of stock" dropdown for "Baby Spinach, 5 oz" and verify a "Backup item" dropdown appears.

## Pick the backup item
Select "Spring Mix, 5 oz" as the backup and verify a badge appears reading "Saved: Choose a specific replacement → Spring Mix, 5 oz".

## Confirm it persists after reload
Reload the page and verify the cart still shows "Saved: Choose a specific replacement → Spring Mix, 5 oz".
