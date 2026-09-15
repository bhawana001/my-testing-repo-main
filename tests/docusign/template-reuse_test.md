---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign-clone-app/templates?reset=true
max_steps: 45
tags: [docusign, documents, templates]
---

# DocuSine 43.3: Template reuse

Catalog objective: send a new envelope from a template.
Key assertion: the fields are prefilled from the template.

## Verify the template
Verify the "Mutual NDA" template card shows a subject of "Please sign: Mutual NDA" and fields of "Signature, Date signed, Company name".

## Start from the template
Click the use button on "Mutual NDA" and verify the send page opens.

## Verify the template prefilled the envelope
Verify "Subject" reads "Please sign: Mutual NDA", the message reads "Standard two-way NDA — no changes from our usual terms.", and the field list already contains Signature, Date signed and Text fields.

## Send it and confirm the template is recorded
Type "Sam Rivera" into "Name", "sam@riverfield.test" into "Email", click "Send for signature", and verify the confirmation shows "Fields to complete" of 3 and "From template" of "Mutual NDA".
