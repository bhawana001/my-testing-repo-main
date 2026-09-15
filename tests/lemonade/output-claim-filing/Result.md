---
test: ../claim-filing_test.md
status: passed
started: 2026-09-13T12:43:28.317Z
duration_s: 175
session_id: 11c9344f-f548-4c59-bead-1c30f87f32a7
---

# Lemonaid 26.3: Claim filing video flow — Result

## Open claims ✓ passed (18.7s)
md5: 2c863eaf292ad7151671a4bafddfab50
Go to https://my-testing-repo-main.vercel.app/lemonade/claim-filing?reset=true and verify the step "I'm Jim, I'll handle your claim. What happened?" is shown.

## What happened ✓ passed (33.3s)
md5: 709c33c23187bd732ca430a383fd829a
Choose "Theft", set "When did it happen?" to 2026-09-12, click "Continue", and verify the step "Tell me about it".

## Details without a police report ✓ passed (29.5s)
md5: d056ae30fd635a82eac61b7e7724be87
Type "My bike was stolen from the building garage overnight." into the description and "850" into Estimated loss, click "Continue", and verify the message "A police report is required for theft claims."

## Confirm the report and statement ✓ passed (56.8s)
md5: da27ef550474d41f02f9a660f03cf3a8
Check "I filed a police report (required for theft)", click "Continue", check "I confirm the information I provided is true" on the video statement step, click "Continue", and verify the review step "Review your claim" lists "Theft" and "850".

## Submit ✓ passed (35.3s)
md5: f25e018be403cb7e19d3315e63d46bab
Click "Submit claim" and verify "Got it. Your claim is in." with a "Claim ID" reading "CLM-260912-THE" and status "Under review".
