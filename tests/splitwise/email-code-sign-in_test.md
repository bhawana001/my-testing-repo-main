---
mode: testing
url: http://localhost:4321/splitwise-clone-app?reset=true
max_steps: 45
tags: [splitwise, fintech, auth, otp]
---

# Splitwyse: Sign in with an emailed code

Objective: sign in with an email and a 6-digit code delivered to the simulated /inbox.
Key assertion: the code is never shown on the sign-in page, and entering the emailed code signs you in.

## Request a sign-in code
Click "Sign in" in the header, type "alice@example.com" into "Email address", and click "Send code", and verify the page says a 6-digit code was emailed to "alice@example.com" and no 6-digit number is shown anywhere on the page.

## Read the code from the inbox
Go to http://localhost:4321/inbox, click the newest email with the subject "Your Splitwyse sign-in code", store the 6-digit code from its body as "otp", and verify the email is addressed to "alice@example.com".

## Enter the code
Go to http://localhost:4321/splitwise-clone-app/login (no query string), type {{otp}} into "6-digit code", and click "Sign in", and verify the header shows "Signed in as alice@example.com" and the "Goa Trip" heading is visible.
