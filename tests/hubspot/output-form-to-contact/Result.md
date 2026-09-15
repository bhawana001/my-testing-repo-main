---
test: ../form-to-contact_test.md
status: passed
started: 2026-09-13T13:07:52.893Z
duration_s: 116
session_id: e8847321-8306-4bec-a60a-7fcf53659010
---

# HubSpotty 29.1: Form to contact creation — Result

## Submit the landing page form ✓ passed (43.4s)
md5: e412d9064f0046925c978208d0d4ffa9
Go to https://my-testing-repo-main.vercel.app/hubspot/form-to-contact?reset=true, type "Sam" into First name, "Lee" into Last name, "sam@acme.test" into Work email, "Acme Robotics" into Company, select "51–200" for Company size, click "Download now", and verify "Thanks! Check your inbox for the playbook."

## Open the CRM ✓ passed (26.4s)
md5: c7d00361f891e1202814fe9d2a28ef49
Click the "CRM" tab and verify the Contacts table lists "Sam Lee" with email "sam@acme.test", company "Acme Robotics" and original source "Form: Ebook download".

## Verify the contact record ✓ passed (44.5s)
md5: 1d3ae09c303d14f080198c314d5b320c
Click "Sam Lee" and verify the record shows Email "sam@acme.test", Company "Acme Robotics", Company size "51–200" and Original source "Form: Ebook download".
