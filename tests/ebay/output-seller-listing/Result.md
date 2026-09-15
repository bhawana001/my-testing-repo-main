---
test: ../seller-listing_test.md
status: passed
started: 2026-09-15T10:22:41.383Z
duration_s: 236
session_id: d20a6c23-acab-4763-b382-04c8972c9f0a
---

# eBid 6.4: Seller listing creation — Result

## Confirm required fields are enforced ✓ passed (28.7s)
md5: d08f8f4efe75fe2675f4ccf58277b144
Click "Publish listing" without filling anything and verify errors appear reading "Give your listing a title." and "Add at least one photo."

## Fill in the item details ✓ passed (33.5s)
md5: df002fddb24055c28bf384bdc7e5a116
Type "Handbuilt Mechanical Keyboard" into the listing title, select "Open box" as the Condition, and verify the condition dropdown shows "Open box".

## Add photos ✓ passed (40.6s)
md5: 3a12c9219d8c7e4df4f456b5b8ea0d32
Click the "front.jpg" checkbox and the "detail.jpg" checkbox, then verify both are checked.

## Set the price ✓ passed (36.1s)
md5: 2ac2ac56a2b890a4b0c646865382d06c
Type "185" into the Price field, type "6.50" into the shipping cost field, and verify the price field contains "185".

## Publish and confirm it is live ✓ passed (41s)
md5: e2d1ca05337e6903d3a2a7e99da5d672
Click "Publish listing" and verify the page shows "Your listing is live" for "Handbuilt Mechanical Keyboard" with a price of "$185.00", condition "Open box" and "2 uploaded" photos.

## Confirm it is searchable ✓ passed (47.5s)
md5: c1b592bc03f3d0d62e2fbfe1a0de5c13
Click "View it in listings" and verify the listings grid includes "Handbuilt Mechanical Keyboard" priced "$185.00".
