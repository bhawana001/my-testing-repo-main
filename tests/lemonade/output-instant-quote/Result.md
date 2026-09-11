---
test: ../instant-quote_test.md
status: passed
started: 2026-09-11T11:26:58.166Z
duration_s: 309
session_id: 3ad4e2f6-de49-4d68-9375-b4d83c68e118
---

# Lemonaid 26.1: Instant quote flow — Result

## Open the quote flow ✓ passed (23.4s)
md5: 07b16450aab4b6cd0d9196b15b1705a4
Go to https://my-testing-repo-main.vercel.app/lemonade/instant-quote?reset=true and verify the heading "Renters insurance, in about 90 seconds" and the step heading "Hi! I'm Maya. Where do you live?" are visible.

## Home step with a validation error ✓ passed (55.4s)
md5: cab914d45c6841173c128bf67cdba297
Type "1200 Market St" into "Street address" and "941" into "ZIP code", select the "Apartment" option, click "Continue", and verify the validation message "Enter a 5-digit ZIP code." is shown.

## Fix the ZIP and continue ✓ passed (46s)
md5: 2dd36789f061bafd1da30fdfbf93e819
Change "ZIP code" to "94103" and click "Continue". Verify the step heading "How much are your belongings worth?" is visible.

## Your stuff step ✓ passed (57.4s)
md5: 0cce75f89a308b9e3238b7d41f7920e6
Select "$20,000" for "Personal property coverage", select "$100,000" for "Personal liability", choose the "$500" deductible option, and click "Continue". Verify the step heading "A couple more things" is visible.

## About you step ✓ passed (50.8s)
md5: dc6f27dbcc6647cd0ec81debd35bcb2a
Type "Demo" into "First name", "User" into "Last name", "demo@evals.dev" into "Email", choose "No pets", choose "No thanks" for extra coverage, and click "Continue". Verify the review heading "Here's what you told me" is shown with "Personal property" listed as "$20,000".

## Get the price ✓ passed (72.4s)
md5: 8c70ff3b20b8e5b6cd743556dd24ba67
Click "Get my price" and verify the result shows "Your quote is ready", a premium of "$15.00" per month, and a "Coverage summary" listing "Personal property $20,000.00", "Personal liability $100,000.00", "Deductible $500.00" and "Monthly premium $15.00".
