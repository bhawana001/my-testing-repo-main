---
mode: testing
url: https://my-testing-repo-main.vercel.app/shop-clone-app/orders?reset=true
max_steps: 45
tags: [amazon, e-commerce, returns]
---

# ShopKart 1.5: Return initiation

Catalog objective: start a return on a delivered order.
Key assertion: return confirmation with a return authorization number.

## Open the delivered order
Click "Return or replace items" on order "112-4419602-7831456" and verify the order detail page shows "Delivered Friday, September 5".

## Start the return
Click "Return or replace items" in the Returns section and verify a reason dropdown labelled "Why are you returning this?" is shown.

## Choose a reason and method
Select "Item arrived damaged" as the reason, click "Schedule a pickup", and verify "Schedule a pickup" is selected.

## Submit the return
Click "Submit return" and verify the page shows "Return started" with a return authorization starting with "RMA-" and a refund line containing "$86.39".
