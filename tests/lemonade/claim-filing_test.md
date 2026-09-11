---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade/claim-filing?reset=true
max_steps: 40
tags: [lemonade, insurance, wizard]
---

# Lemonaid 26.3: Claim filing video flow

Catalog objective: file a claim describing an incident.
Key assertion: the claim is submitted with a claim ID.

## Open claims
Go to https://my-testing-repo-main.vercel.app/lemonade/claim-filing?reset=true and verify the step "I'm Jim, I'll handle your claim. What happened?" is shown.

## What happened
Choose "Theft", set "When did it happen?" to 2026-09-12, click "Continue", and verify the step "Tell me about it".

## Details without a police report
Type "My bike was stolen from the building garage overnight." into the description and "850" into Estimated loss, click "Continue", and verify the message "A police report is required for theft claims."

## Confirm the report and statement
Check "I filed a police report (required for theft)", click "Continue", check "I confirm the information I provided is true" on the video statement step, click "Continue", and verify the review step "Review your claim" lists "Theft" and "850".

## Submit
Click "Submit claim" and verify "Got it. Your claim is in." with a "Claim ID" reading "CLM-260912-THE" and status "Under review".
