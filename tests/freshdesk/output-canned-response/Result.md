---
test: ../canned-response_test.md
status: passed
started: 2026-09-13T13:44:17.155Z
duration_s: 88
session_id: f8a5e07b-8559-42ec-81d5-72fdf0f830d3
---

# Freshdeskly 33.2: Canned response insert — Result

## Open the ticket ✓ passed (28.4s)
md5: 789b3de35bfdf48eb86d4e9ea51680f4
Go to https://my-testing-repo-main.vercel.app/freshdesk/canned-response?reset=true and verify ticket "#2044 · Order #A-7731 not delivered" from Maria Chen with an empty reply box.

## Insert the canned response ✓ passed (34.7s)
md5: 9e6b3828853e6e9cf396827ae702cb52
Click "Insert canned response", click "Insert" next to "Delivery delay apology", and verify "Inserted canned response: Delivery delay apology".

## Verify resolved placeholders ✓ passed (22.9s)
md5: df315327f0d6bfcf8458d0ae81b339a1
Verify the reply box starts with "Hi Maria,", contains "ticket #2044", ends with "Demo User", and contains no "{{" placeholder text.
