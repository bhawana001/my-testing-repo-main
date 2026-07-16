# Open a high-yield savings account

> DRAFT — finalize/verify with `kane-cli generate` before filming (see RUNBOOK).
> Kane works from intent, not hard-coded selectors, so the renamed-CTA
> (Auto-Heal) break does not affect these steps.

## Objective
Open a high-yield savings account on the GO MoneyRates demo and confirm the
application is submitted successfully.

## Steps
1. Go to http://localhost:3000/bank-clone-app/open-account
2. Choose the High-Yield Savings account option
3. Continue to the applicant details step
4. Fill in the applicant:
   - First name: Alex
   - Last name: Rivera
   - Email: alex@example.com
   - Date of birth: 1990-05-14
   - Phone: (555) 123-4567
   - SSN last 4: 1234
   - Address: 123 Market St, San Francisco, CA 94103
5. Continue to the funding step
6. Enter an opening deposit of 500 dollars
7. Continue to the review step
8. Accept the terms and submit the application

## Assertions
- The confirmation screen shows a success message that the account
  application was submitted
- The confirmation summary shows the High-Yield Savings account and the
  500 dollar opening deposit
- The primary call-to-action buttons are actually visible to a user
  (visual validation — catches the CSS-only regression)
