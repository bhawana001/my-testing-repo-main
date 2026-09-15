---
test: ../blueprint-transition_test.md
status: passed
started: 2026-09-13T13:37:47.987Z
duration_s: 128
session_id: dad6ea89-cc34-4507-891d-bfe6a522d31a
---

# Zohoo CRM 32.3: Blueprint stage transition — Result

## Open the deal ✓ passed (27.8s)
md5: 59d1c7fe0d548a6c7ec21fd43481dd28
Go to https://my-testing-repo-main.vercel.app/zoho-crm/blueprint-transition?reset=true and verify the deal "Globex · Annual platform deal" is in stage "Qualification" with a "Send proposal" transition button.

## Try without required inputs ✓ passed (29.2s)
md5: 231f15fd7cc20e4f8b47c7cdd522e65c
Click "Send proposal", click "Save" without filling anything, and verify "Proposal Amount is required."

## Complete the inputs ✓ passed (41.4s)
md5: c4e3032643a05d6d17d99e4362b4d99b
Type "52000" into Proposal Amount and set Expected Closing Date to 2026-10-30, click "Save", and verify the modal closes.

## Verify the stage advanced ✓ passed (26.5s)
md5: fc72493172db409d25e8e54a506ccb1e
Verify the stage badge reads "Proposal/Price Quote", Amount reads "$52,000.00", Expected close reads "2026-10-30", and the timeline's top entry reads "Transition “Send proposal” completed: Qualification → Proposal/Price Quote".
