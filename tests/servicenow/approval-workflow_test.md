---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/approval-workflow?reset=true
max_steps: 45
tags: [servicenow, itsm, wizard]
---

# ServiceNowly 34.2: Approval workflow

Catalog objective: submit a change request and approve it as the approver.
Key assertion: the state moves to approved.

## Submit a change
Go to https://my-testing-repo-main.vercel.app/servicenow/approval-workflow?reset=true, type "Upgrade database to v16" into Short description and "Security patches and performance." into Justification, click "Request approval", and verify "CHG0030017" with Approval "Requested" and State "Assess".

## Switch to the approver
Click "As approver (Priya)" and verify "Approve" and "Reject" buttons appear.

## Approve
Click "Approve" and verify Approval reads "Approved", State reads "Scheduled", and the approval history's top entry reads "Approved by Priya Nair".
