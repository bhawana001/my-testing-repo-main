---
mode: testing
url: https://my-testing-repo-main.vercel.app/airtable/form-view-submission?reset=true
max_steps: 45
tags: [airtable, work-collab, wizard]
---

# Airtably 39.2: Form view submission

Catalog objective: submit the shared form and verify a row is created.
Key assertion: a new record with the form values.

## Invalid email
Go to https://my-testing-repo-main.vercel.app/airtable/form-view-submission?reset=true, type "Sam Lee" into Name and "sam@acme" into Email, choose rating 5, click "Submit", and verify "Please enter a valid email."

## Submit
Change Email to "sam@acme.test", type "Great onboarding." into Feedback, click "Submit", and verify "Thanks for submitting the form!"

## Verify the new record
Click "Grid view" and verify "2 records" with a new row "rec-2", "Sam Lee", "sam@acme.test", "5 ★", "Great onboarding." and source "Form".
