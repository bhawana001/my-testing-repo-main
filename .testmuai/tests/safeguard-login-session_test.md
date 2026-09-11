---
mode: testing
max_steps: 30
target: chrome
chrome_profile: /Users/bhawana/.testmuai/kaneai/profiles/safeguard
variables:
  secrets.user.password:
    value: demo1234
    secret: true
    syntax: '{{password}}'
    type: secret
---

# SafeGuard — login lands on dashboard and persists a session

## Step 1
Open the SafeGuard login page at http://localhost:3000/insurance-clone-app/login, type
'policy@safeguard.test' into the Email / User ID field, type {{password}} into the Password
field, and click Log In. In this same step, confirm the POST to /api/insurance/login returned
HTTP status 200 and its response body contains a non-empty token.

## Step 2
Wait for the redirect to finish. Do not click Log In again — the button disables itself while
it navigates. Confirm the URL now contains /insurance-clone-app/dashboard, the page shows
'Welcome back, policy', and the active policy card shows policy number SG-AUTO-4417-2026 with
status Active.

## Step 3
On the dashboard, confirm a cookie named safeguard_session exists and is httpOnly. Do not
navigate back to the login page.
