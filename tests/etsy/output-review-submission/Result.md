---
test: ../review-submission_test.md
status: passed
started: 2026-09-15T10:12:47.326Z
duration_s: 166
session_id: 7a46efb7-1788-48b8-87e3-afc565782d6f
---

# Etsi 5.4: Review submission — Result

## Confirm a delivered order exists ✓ passed (29.8s)
md5: f9c7bd800d5942d48a0bbc670ba7617a
Verify the orders page shows order "ET-4471" with status "Delivered August 27, 2026" containing "Hand-thrown Speckled Mug".

## Open the review form ✓ passed (25.5s)
md5: e051eba8adcffd3fc52b4e8010104a1e
Click "Leave a review" and verify a review form appears with a Rating dropdown and a "Your review" field.

## Confirm the review text is required ✓ passed (27.6s)
md5: 75d7f70f0cac60b97a367e891ad3b4f8
Click "Post review" without entering text and verify an error appears reading "Write a few words about the item."

## Write the review and attach a photo ✓ passed (30.6s)
md5: 02995f9b26bbf5419f54fb83b13095e6
Select "★★★★★ (5)" as the Rating, type "Beautiful glaze and it holds heat well." into "Your review", select "mug-on-shelf.jpg" as the photo, and verify the photo dropdown shows "mug-on-shelf.jpg".

## Post the review ✓ passed (50s)
md5: 853e170c363e1899eb02a4f16e7ba893
Click "Post review" and verify the page shows "Review posted" and a review under the listing reading "Beautiful glaze and it holds heat well." with a photo badge "📷 mug-on-shelf.jpg".
