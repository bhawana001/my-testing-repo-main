---
mode: testing
url: https://my-testing-repo-main.vercel.app/docusign-clone-app/send?reset=true
max_steps: 45
tags: [docusign, documents, esign]
---

# DocuSine 43.1: Envelope send

Catalog objective: send a document for signature with two fields.
Key assertion: the recipient receives a signing link.

## Set the document up
Type "Please sign: Service agreement" into "Subject" and "Two-year agreement, standard terms." into "Message to signer".

## Add two fields
Click "Signature" and then "Date signed" in the add-field buttons, and verify the field list shows both a Signature and a Date signed field.

## Add the recipient
Type "Sam Rivera" into "Name" and "sam@riverfield.test" into "Email", then click "Send for signature".

## Verify the signing link
Verify a green banner titled "Envelope sent" names envelope "ENV-7742" sent to Sam Rivera (sam@riverfield.test), with "Fields to complete" of 2 and a link through to the signing page.
