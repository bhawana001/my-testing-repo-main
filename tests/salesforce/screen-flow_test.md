---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/screen-flow?reset=true
max_steps: 40
tags: [salesforce, crm, wizard]
---

# Salesforze 28.5: Flow screen completion

Catalog objective: complete an intake screen flow with branching.
Key assertion: the flow finishes with a success screen and a record is created.

## Start the flow
Go to https://my-testing-repo-main.vercel.app/salesforce/screen-flow?reset=true and verify the screen "Customer intake" and an empty "Records created by this flow" table.

## Choose the support branch
Choose "Support issue", select "Initech" as Account, click "Continue", and verify the next screen is "Support issue" (not the sales screen).

## Support details
Type "Login fails after SSO change" into Subject, select "High" priority, click "Continue", and verify the "Confirm and finish" screen.

## Finish
Click "Finish" and verify "Your case has been created" with the badge "Flow finished", Record "500-101" and Type "Case".

## Verify the record
Verify the "Records created by this flow" table lists "500-101", "Case", "Login fails after SSO change", "Priority High".
