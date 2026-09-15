---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-clone-app/blueprint?reset=true
max_steps: 45
tags: [zoho-crm, crm, workflow]
---

# Zohoe CRM 32.3: Blueprint stage transition

Catalog objective: move a record through a blueprint transition with required inputs.
Key assertion: the transition completes and the stage advances.

## Verify the starting stage
With lead "L1 — Mira Shah" selected, verify "Current stage" reads "Qualification" and "Next stage" reads "Needs analysis".

## Verify the transition is refused without its inputs
Click "Move to Needs analysis" and verify a red banner reads "This transition needs: Confirmed budget, Decision maker name."

## Supply the required inputs
Type "48000" into "Confirmed budget" and "Ravi Menon" into "Decision maker name", then click "Move to Needs analysis".

## Verify the stage advanced
Verify a green banner reads "Moved to Needs analysis.", "Current stage" now reads "Needs analysis", the "Captured so far" card shows "budget" of "48000" and "authority" of "Ravi Menon", and the record log contains "Blueprint: Qualification → Needs analysis".
