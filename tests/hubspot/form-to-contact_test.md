---
mode: testing
url: https://my-testing-repo-main.vercel.app/hubspot-clone-app/landing?reset=true
max_steps: 45
tags: [hubspot, crm, forms]
---

# Hubsprout 29.1: Form to contact creation

Catalog objective: submit a landing page form and verify a contact is created.
Key assertion: the contact exists with the submitted field values.

## Fill in the landing page form
Type "Sam" into "First name", "Rivera" into "Last name", "sam@riverfield.test" into "Work email", "Riverfield FC" into "Company" and "555 0110" into "Phone".

## Submit it
Click "Download the report" and verify a green card titled "Thanks — your download is on its way" appears.

## Verify the contact was created with the form values
Verify the confirmation shows "Contact created" of "Sam Rivera", "Email" of "sam@riverfield.test", "Company" of "Riverfield FC" and "Original source" of "Landing page form".

## Verify the record in the CRM
Click "See the contact in the CRM" and verify "Contact count" reads 2 and the table has a "Sam Rivera" row with email "sam@riverfield.test", company "Riverfield FC", phone "555 0110" and source "Landing page form".
