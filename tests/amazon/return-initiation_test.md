---
mode: testing
url: https://my-testing-repo-main.vercel.app/amazon/return-initiation?reset=true
max_steps: 45
tags: [amazon, e-commerce, wizard]
---

# Amazonia 1.5: Return initiation

Catalog objective: start a return on a delivered item, pick a reason, get the drop-off label step.
Key assertion: the return confirmation and refund estimate are shown.

## Choose the item
Go to https://my-testing-repo-main.vercel.app/amazon/return-initiation?reset=true, choose "Everyday Cotton Tee (M, Black)", click "Continue", and verify the step "Why are you returning this?"

## Reason needing comments
Select "Item defective or doesn't work", click "Continue", and verify "Please describe the problem."

## Add comments
Type "Seam split after one wash." into Comments, click "Continue", and verify the step "How would you like your refund?"

## Refund and drop-off
Choose "Original payment · Visa •••• 4242", click "Continue", choose "Drop off at Parcel Point, Market St", click "Continue", and verify the "Confirm your return" review step.

## Confirm
Click "Confirm return" and verify "Your return is confirmed" with Return ID "RMA-D4471".

## Verify refund estimate and label step
Verify "Refund estimate" reads "$18.00 to Visa •••• 4242", the next step reads "Next step: Drop off at Parcel Point, Market St", and a return QR code is shown.
