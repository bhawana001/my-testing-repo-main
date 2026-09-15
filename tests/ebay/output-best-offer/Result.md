---
test: ../best-offer_test.md
status: passed
started: 2026-09-15T10:19:44.434Z
duration_s: 158
session_id: 5d9be3d7-581b-4b00-b0db-96da29d812ab
---

# eBid 6.3: Best Offer flow — Result

## Open a listing that accepts offers ✓ passed (49.2s)
md5: 31cad0dfc862beb1c222541bc9f3cb06
Click "50mm f/1.8 Prime Lens" and verify the listing shows a price of "$219.00" and a "Send Best Offer" button.

## Reject an offer at or above asking ✓ passed (30.3s)
md5: d7e8d3ccff8e30b6d5e38361d921dca6
Type "219" into the offer field, click "Send Best Offer", and verify an error appears reading "A Best Offer must be below the asking price."

## Send a lower offer ✓ passed (39.9s)
md5: 599ee8cf3c85bea76f87b6d1aa6de060
Clear the offer field, type "180", click "Send Best Offer", and verify the page shows "Offer sent" with an amount of "$180.00".

## Confirm the pending state ✓ passed (36.8s)
md5: 9d1bf563f863a297e297fd723a4e01ce
Click "My eBid" and verify the Best Offers list shows "50mm f/1.8 Prime Lens" at "$180.00" with status "Pending seller response".
