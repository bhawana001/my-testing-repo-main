---
mode: testing
url: https://my-testing-repo-main.vercel.app/etsy/review-submission?reset=true
max_steps: 45
tags: [etsy, e-commerce, feed]
---

# Etsily 5.4: Review submission

Catalog objective: leave a review with a photo on a delivered order.
Key assertion: the review appears under the listing.

## Open the review form
Go to https://my-testing-repo-main.vercel.app/etsy/review-submission?reset=true, click "Leave a review" next to "Custom Name Ceramic Mug", and verify star buttons and a review text box.

## Submit empty
Click "Post review" and verify "Choose a star rating."

## Write the review
Click the 5th star, type "Perfect gift, the name print is crisp." into the review box, click "+ Add sample photo", and verify "📷 mug-photo.jpg attached".

## Post
Click "Post review" and verify the listing's Reviews section opens.

## Verify under the listing
Verify the top review shows 5 stars, "Perfect gift, the name print is crisp.", a photo thumbnail, and "Demo U.".
