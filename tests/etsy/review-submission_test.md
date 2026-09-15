---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy-clone-app/orders?reset=true
max_steps: 45
tags: [etsy, marketplace, reviews]
---

# Etsi 5.4: Review submission

Catalog objective: leave a review with a photo on a delivered order.
Key assertion: the review appears under the listing.

## Confirm a delivered order exists
Verify the orders page shows order "ET-4471" with status "Delivered August 27, 2026" containing "Hand-thrown Speckled Mug".

## Open the review form
Click "Leave a review" and verify a review form appears with a Rating dropdown and a "Your review" field.

## Confirm the review text is required
Click "Post review" without entering text and verify an error appears reading "Write a few words about the item."

## Write the review and attach a photo
Select "★★★★★ (5)" as the Rating, type "Beautiful glaze and it holds heat well." into "Your review", select "mug-on-shelf.jpg" as the photo, and verify the photo dropdown shows "mug-on-shelf.jpg".

## Post the review
Click "Post review" and verify the page shows "Review posted" and a review under the listing reading "Beautiful glaze and it holds heat well." with a photo badge "📷 mug-on-shelf.jpg".
