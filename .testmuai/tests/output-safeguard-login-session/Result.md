---
test: ../safeguard-login-session_test.md
status: passed
started: 2026-09-01T14:29:14.164Z
duration_s: 137
session_id: 48ca6a94-d84d-4cca-9c45-f82e05111fd2
---

# SafeGuard — login lands on dashboard and persists a session — Result

## Step 1 ✓ passed (35.7s)
md5: 56832a186a67a11bda1723f4c1f9ed59
Open the SafeGuard login page at http://localhost:3000/insurance-clone-app/login, type
'policy@safeguard.test' into the Email / User ID field, type {{password}} into the Password
field, and click Log In. In this same step, confirm the POST to /api/insurance/login returned
HTTP status 200 and its response body contains a non-empty token.

## Step 2 ✓ passed (59.7s)
md5: 30c0f13b033faa5d1381dbb526ce1fcd
Wait for the redirect to finish. Do not click Log In again — the button disables itself while
it navigates. Confirm the URL now contains /insurance-clone-app/dashboard, the page shows
'Welcome back, policy', and the active policy card shows policy number SG-AUTO-4417-2026 with
status Active.

## Step 3 ✓ passed (37.3s)
md5: 8d76b798b3823d9f81d17ff85c7a82c6
On the dashboard, confirm a cookie named safeguard_session exists and is httpOnly. Do not
navigate back to the login page.
