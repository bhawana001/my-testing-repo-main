---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce-clone-app/flow?reset=true
max_steps: 45
tags: [salesforce, crm, automation]
---

# Salesfource 28.5: Screen flow with branching

Catalog objective: complete an intake screen flow with branching.
Key assertion: the flow finishes with a success screen and a record is created.

## Start the flow
Verify the page title reads "Customer intake" on "Screen 1 of 3", choose the sales enquiry option, type "Sam Rivera" into "Your name", and click "Next".

## Verify the branch taken
Verify the flow took the sales branch by showing a "Company name" field rather than a support "Priority" field.

## Complete the branch
Type "Riverfield FC" into "Company name", type "50000" into "Approximate budget", and click "Finish".

## Verify the success screen and the created record
Verify a banner titled "Thanks — you're all set" appears naming a created record with its id, and the success screen shows a "Record type" and a "Summary" of what was captured.
