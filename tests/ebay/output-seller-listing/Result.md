---
test: ../seller-listing_test.md
status: passed
started: 2026-09-13T10:31:34.174Z
duration_s: 248
session_id: 32816629-e144-4b18-87d3-141d24702b15
---

# eBidz 6.4: Seller listing creation — Result

## Photos step validation ✓ passed (24.3s)
md5: 31e464452ea01abdc1cbd3d84a614b82
Go to https://my-testing-repo-main.vercel.app/ebay/seller-listing?reset=true, click "Continue" on the "Add photos" step without adding photos, and verify "Add at least 2 photos."

## Add photos ✓ passed (30.4s)
md5: de091178f5d329268390a9f00a84d2e1
Click "+ front.jpg" and "+ back.jpg", and verify both photos are listed.

## Continue to details ✓ passed (20.1s)
md5: 79b90fe1b8861b2445f285c6854c918a
Click "Continue" and verify the "Item details" step is shown.

## Details ✓ passed (24.1s)
md5: e09ea69af9e4c145d800552e6460fad3
Type "Mechanical Keyboard · Brown switches" into Title, choose "Used", type "Lightly used, all keys work." into Description, and click "Continue".

## Pricing ✓ passed (72.5s)
md5: 9326902d89f95b671f11ce5fe030ceb4
Type "75" into "Buy It Now price (USD)", select "Free standard shipping", click "Continue", and verify the review step lists the title and "75".

## Publish ✓ passed (24.7s)
md5: 4e717485674860d2cafbb47bfb840afb
Click "List it" and verify "Your listing is live" with the title "Mechanical Keyboard · Brown switches" and price "$75.00".

## Search for it ✓ passed (50.2s)
md5: a87e68f8a1c72e5ea2a08d7e98076297
Type "mechanical keyboard" into "Search for anything", click "Search", and verify "1 result for “mechanical keyboard”" showing "Mechanical Keyboard · Brown switches · Used" at "$75.00".
