---
test: ../card-dispute_test.md
status: passed
started: 2026-09-13T12:18:30.418Z
duration_s: 168
session_id: 9e71fa8d-ad2c-4e1d-a7d7-a82af9393329
---

# Chaise Bank 23.5: Credit card dispute — Result

## Open disputes ✓ passed (38.9s)
md5: e78510995d4e94cef3a22cd4925382c0
Go to https://my-testing-repo-main.vercel.app/chase/card-dispute?reset=true and verify the wizard "Which transaction do you want to dispute?" lists "AIRLINE TICKETS INC · $412.80", "GADGET WORLD ONLINE · $89.00" and "CAFE LUNA · $14.20".

## Choose the transaction and reason ✓ passed (38.9s)
md5: db964f15f80d4686cdb93007b50b99ef
Choose "GADGET WORLD ONLINE · $89.00", click "Continue", choose "I was charged more than once", click "Continue", and verify the validation message "Please describe what happened." is shown.

## Add details and review ✓ passed (35s)
md5: 32cb1b8639c976a22c8795e63dc9b42f
Type "Charged twice on the same day." into Additional details, click "Continue", and verify the review step lists the transaction and reason.

## Submit ✓ passed (27.3s)
md5: 3d917a3e94daa6f6c48ff90a8630dcfa
Click "Submit dispute" and verify the confirmation "We're reviewing your dispute" with the badge "Dispute submitted".

## Verify the case reference ✓ passed (26.4s)
md5: 6b26fa86814540165b628e19a46b420c
Verify a "Case reference" starting with "DSP-2026-" is displayed along with "Provisional credit" and "Expected resolution" rows.
