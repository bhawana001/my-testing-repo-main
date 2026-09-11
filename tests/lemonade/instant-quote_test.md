---
mode: testing
url: https://my-testing-repo-main.vercel.app/lemonade/instant-quote?reset=true
max_steps: 40
tags: [lemonade, insurance, wizard]
---

# Lemonaid 26.1: Instant quote flow

Catalog objective: complete a renters insurance quote conversation to a price.
Key assertion: a premium is quoted with a coverage summary.

## Open the quote flow
Go to https://my-testing-repo-main.vercel.app/lemonade/instant-quote?reset=true and verify the heading "Renters insurance, in about 90 seconds" and the step heading "Hi! I'm Maya. Where do you live?" are visible.

## Home step with a validation error
Type "1200 Market St" into "Street address" and "941" into "ZIP code", select the "Apartment" option, click "Continue", and verify the validation message "Enter a 5-digit ZIP code." is shown.

## Fix the ZIP and continue
Change "ZIP code" to "94103" and click "Continue". Verify the step heading "How much are your belongings worth?" is visible.

## Your stuff step
Select "$20,000" for "Personal property coverage", select "$100,000" for "Personal liability", choose the "$500" deductible option, and click "Continue". Verify the step heading "A couple more things" is visible.

## About you step
Type "Demo" into "First name", "User" into "Last name", "demo@evals.dev" into "Email", choose "No pets", choose "No thanks" for extra coverage, and click "Continue". Verify the review heading "Here's what you told me" is shown with "Personal property" listed as "$20,000".

## Get the price
Click "Get my price" and verify the result shows "Your quote is ready", a premium of "$15.00" per month, and a "Coverage summary" listing "Personal property $20,000.00", "Personal liability $100,000.00", "Deductible $500.00" and "Monthly premium $15.00".
