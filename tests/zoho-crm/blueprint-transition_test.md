---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-crm/blueprint-transition?reset=true
max_steps: 40
tags: [zoho-crm, crm, wizard]
---

# Zohoo CRM 32.3: Blueprint stage transition

Catalog objective: move a record through a blueprint transition with required inputs.
Key assertion: the transition completes and the stage advances.

## Open the deal
Go to https://my-testing-repo-main.vercel.app/zoho-crm/blueprint-transition?reset=true and verify the deal "Globex · Annual platform deal" is in stage "Qualification" with a "Send proposal" transition button.

## Try without required inputs
Click "Send proposal", click "Save" without filling anything, and verify "Proposal Amount is required."

## Complete the inputs
Type "52000" into Proposal Amount and set Expected Closing Date to 2026-10-30, click "Save", and verify the modal closes.

## Verify the stage advanced
Verify the stage badge reads "Proposal/Price Quote", Amount reads "$52,000.00", Expected close reads "2026-10-30", and the timeline's top entry reads "Transition “Send proposal” completed: Qualification → Proposal/Price Quote".
