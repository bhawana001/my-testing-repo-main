---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot/form-to-contact?reset=true
max_steps: 40
tags: [hubspot, crm, crud]
---

# HubSpotty 29.1: Form to contact creation

Catalog objective: submit a landing page form and verify the contact is created.
Key assertion: the contact exists with the form field values.

## Submit the landing page form
Go to https://my-testing-repo-main.vercel.app/hubspot/form-to-contact?reset=true, type "Sam" into First name, "Lee" into Last name, "sam@acme.test" into Work email, "Acme Robotics" into Company, select "51–200" for Company size, click "Download now", and verify "Thanks! Check your inbox for the playbook."

## Open the CRM
Click the "CRM" tab and verify the Contacts table lists "Sam Lee" with email "sam@acme.test", company "Acme Robotics" and original source "Form: Ebook download".

## Verify the contact record
Click "Sam Lee" and verify the record shows Email "sam@acme.test", Company "Acme Robotics", Company size "51–200" and Original source "Form: Ebook download".
