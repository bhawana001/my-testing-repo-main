---
mode: testing
url: https://my-testing-repo-main.vercel.app/nike-clone-app?reset=true
max_steps: 45
tags: [nike, e-commerce, sizing]
---

# Nyke 8.1: Size guide and selection

Catalog objective: open the size guide on a shoe, select a size, and add it to the bag.
Key assertion: the selected size is carried into the bag.

## Open a running shoe
Click "Nyke Aeroglide 41" and verify the product page shows the colourway "Black / Volt" and the price "$139.99".

## Open the size guide
Click "📏 Size guide" and verify a dialog appears titled "Size guide" showing a row where US "9" maps to UK "8", EU "42.5" and CM "27".

## Select a size from the guide
Click "Select" on the US "9" row and verify the product page shows a badge reading "Selected: US 9".

## Confirm a sold-out size cannot be chosen
Verify the size "US 9.5 ✕" option is shown as disabled.

## Add to bag and confirm the size carried
Click "Add to Bag", click the "Bag" link in the header, and verify the bag shows "Nyke Aeroglide 41" with "Black / Volt · Size US 9".
