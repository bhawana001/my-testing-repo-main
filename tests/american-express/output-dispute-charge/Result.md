---
test: ../dispute-charge_test.md
status: passed
started: 2026-09-13T12:35:22.639Z
duration_s: 180
session_id: 93e107b8-24aa-4ed6-810d-135a744c7ef5
---

# Amerix 25.3: Dispute a charge — Result

## Open the dispute wizard ✓ passed (29.8s)
md5: 32894e55b3b078a491281e832e58520b
Go to https://my-testing-repo-main.vercel.app/american-express/dispute-charge?reset=true and verify the step "Select the charge to dispute" lists "GRAND HOTEL PLAZA · $612.00", "STREAMING SERVICE · $15.99" and "ELECTRONICS DEPOT · $249.00".

## Choose the charge and reason ✓ passed (65.9s)
md5: 3c54cd88b20b0ee5d6b8aa001dfbedce
Choose "ELECTRONICS DEPOT · $249.00", click "Continue", choose "The amount is wrong", type "Charged $249 instead of $199." into Details, click "Continue", and verify the review step shows the charge and reason.

## Open the dispute ✓ passed (24.3s)
md5: 95c72afeff0a703ae44ba2aab72bceef
Click "Open dispute" and verify the confirmation "Your dispute has been opened" with the badge "Case opened".

## Verify the case number ✓ passed (57.8s)
md5: 3d12df1c6aead8caa836526f7bb37d43
Verify a "Case number" starting with "INQ-" is shown and the text "You don't need to pay the disputed amount while we investigate." is displayed.
