---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike/size-guide?reset=true
max_steps: 40
tags: [nike, e-commerce, checkout]
---

# Nyke 8.1: Size guide and selection

Catalog objective: open the size guide on a shoe, select a size, add to cart.
Key assertion: the selected size is carried into the cart.

## Open the product
Go to https://my-testing-repo-main.vercel.app/nike/size-guide?reset=true and verify "Stride Runner 3" at "$89.00" with size chips US 7 to US 11 and a "Size guide" link.

## Open the size guide
Click "Size guide" and verify a modal "Size guide · Men's shoes" shows a table with US, UK, EU and foot length columns, including the row "US 9", "UK 8", "EU 42.5", "27 cm".

## Select a size from the guide
Click "Select US 9" in the guide and verify the modal closes and the text next to "Select size" reads "US 9".

## Add to bag
Click "Add to Bag" and verify the bag shows "Stride Runner 3" with "Size: US 9 · Color: Black" at "$89.00".
