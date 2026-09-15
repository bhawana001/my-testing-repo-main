---
test: ../approval-workflow_test.md
status: passed
started: 2026-09-13T13:53:43.145Z
duration_s: 104
session_id: f7f50dc0-cc55-43e8-898d-29d4d1899337
---

# ServiceNowly 34.2: Approval workflow — Result

## Submit a change ✓ passed (38.8s)
md5: f3eb8df526e6bec23aaaab1be97bc697
Go to https://my-testing-repo-main.vercel.app/servicenow/approval-workflow?reset=true, type "Upgrade database to v16" into Short description and "Security patches and performance." into Justification, click "Request approval", and verify "CHG0030017" with Approval "Requested" and State "Assess".

## Switch to the approver ✓ passed (25.1s)
md5: d78354bc016dc86fef1c0775059ebcc8
Click "As approver (Priya)" and verify "Approve" and "Reject" buttons appear.

## Approve ✓ passed (37.6s)
md5: a79401a2c77249c85b743fc757e57a4d
Click "Approve" and verify Approval reads "Approved", State reads "Scheduled", and the approval history's top entry reads "Approved by Priya Nair".
