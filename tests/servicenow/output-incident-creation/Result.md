---
test: ../incident-creation_test.md
status: passed
started: 2026-09-13T13:51:10.852Z
duration_s: 134
session_id: b8539a42-76b4-486d-afad-f3103fbd63c4
---

# ServiceNowly 34.1: Incident creation — Result

## Open a new incident ✓ passed (32.5s)
md5: e047da7033e9f9cfbbfb1c1170481690
Go to https://my-testing-repo-main.vercel.app/servicenow/incident-creation?reset=true, click "New", then click "Submit" with empty fields and verify "Category and Short description are mandatory."

## Fill the incident ✓ passed (45.8s)
md5: d0429717d4deeb455bb2b7539ec2870a
Select "Software" for Category, "1 - High" for Impact and "2 - Medium" for Urgency, and verify "Calculated priority" reads "2 - High".

## Submit ✓ passed (33.5s)
md5: dc749ae3226b4a257fe666202987c6e7
Type "Email client crashes on launch" into Short description, click "Submit", and verify "Incident INC0010042 created and assigned to Application Support."

## Verify the list ✓ passed (20s)
md5: eb8e90a6a16488f3b7076e13258d51bd
Verify the incident list's first row reads "INC0010042", "Email client crashes on launch", "Software", "2 - High", "Application Support", state "New".
