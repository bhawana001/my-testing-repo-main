---
test: ../lead-creation_test.md
status: passed
started: 2026-09-13T09:55:36.510Z
duration_s: 110
session_id: ba0c1eca-bb81-41f4-88ae-a3698aee07bb
---

# Salesforze 28.1: Lead creation via LWC form — Result

## Open leads ✓ passed (20.6s)
md5: 822075a0b186d064243bb93aa445c072
Go to https://my-testing-repo-main.vercel.app/salesforce/lead-creation?reset=true and verify "Leads · All Open Leads" lists Maria Chen (Globex) and Ahmed Khan (Initech).

## Save with missing fields ✓ passed (31.2s)
md5: f1ddc94e9c2f659125c5594c9a439777
Click "+ New Lead", click "Create" without filling anything, and verify the errors "*Last Name is required." and "*Company is required."

## Fill required fields ✓ passed (22.8s)
md5: 54ffcd1666a70895b9ab72a4ef27107e
Type "Sam" into First Name, "Lee" into Last Name, "Acme Robotics" into Company, "sam@acme.test" into Email, then click "Create".

## Verify list view and owner ✓ passed (33.5s)
md5: dfe9148aabca8f599268baa4989fd9c6
Verify the list view shows "Sam Lee" at the top with company "Acme Robotics", lead status "Open - Not Contacted" and Lead Owner "Demo User", and the count reads "3 of 3".
