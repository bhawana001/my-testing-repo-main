---
test: ../2026-09-01T11-43-56_test.md
status: passed
started: 2026-09-01T11:41:20.067Z
duration_s: 151.9
session_id: eee9e9fe-de1b-4799-931c-baa1e372bec7
---

# Session: 2026-09-01T11-43-56 — Result

## Step 1 ✓ passed (151.9s)
md5: 62fd6a5b98524d4c4f375c7e9c86fb9f
Open the IRS fraud report form at http://localhost:3000/gov-clone-app/report-fraud/form and push it hard, making four submission attempts in order and checking after each one whether the form blocked the input and whether anything actually went to the server. Attempt 1, empty submit: click 'Submit report' without selecting anything or typing anything, and confirm both 'Please select what you are reporting.' and 'Please provide at least 10 characters of detail.' appear on the page and that no request was sent to /api/gov/report. Attempt 2, whitespace only: select the 'Identity theft' radio, type 12 spaces into the description box, and click 'Submit report' again — confirm it is still rejected with the 10-character message and that still no request was sent, proving the length check runs on trimmed input and not raw characters. Attempt 3, one character below the boundary: clear the box and type exactly 'fraud abc', which is 9 characters, submit, and confirm it is still rejected and no request went out. Attempt 4, exactly at the boundary with a double submit: change the description to exactly 'fraud abcd', which is 10 characters, and click 'Submit report' twice in rapid succession — confirm the error messages clear, that exactly one POST to /api/gov/report was sent and not two, that it returned 201 with a caseId and status 'received', and that the success panel on screen shows that same caseId. Note that each error message is injected above the button and pushes it further down the page, so re-locate the 'Submit report' button on every attempt rather than reusing its earlier position.
