---
mode: testing
url: https://my-testing-repo-main.vercel.app/zendesk-clone-app/widget?reset=true
max_steps: 45
tags: [zendesk, support, tickets]
---

# Zendisk 30.1: Widget ticket

Catalog objective: submit a ticket through the web widget.
Key assertion: the ticket is created with the correct fields.

## Open the widget
Click the "💬 Help" launcher and verify a "How can we help?" form appears.

## Verify the required fields are enforced
Click "Submit" with the form empty and verify inline errors appear on the email, subject and description fields.

## Fill in the request
Type "sam@riverfield.test" into "Your email", "Export never finishes" into "Subject", "The CSV export spins forever on large date ranges." into the description, select "High" in "Priority" and "Problem" in "Type", then click "Submit".

## Verify the ticket was created with those fields
Verify a green banner titled "Ticket received" names ticket "#4413", and the summary shows "Subject" of "Export never finishes", "Priority" of "High", "Type" of "Problem", "Status" of "New" and "Requester" of "sam@riverfield.test".
