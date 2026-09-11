---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow/catalog-order?reset=true
max_steps: 45
tags: [servicenow, itsm, wizard]
---

# ServiceNowly 34.3: Service catalog order

Catalog objective: order a catalog item with form variables.
Key assertion: a request is created with a RITM number.

## Configure the item
Go to https://my-testing-repo-main.vercel.app/servicenow/catalog-order?reset=true, choose the "15-inch Performance" model, select "macOS", check "Include docking station", click "Continue", and verify the step "Who is it for?" with Requested for "Demo User".

## Delivery details
Select "HQ · Floor 7" for Delivery location, type "Design work needs more RAM." into Business justification, click "Continue", and verify the review step.

## Order
Click "Order Now" and verify "Thank you, your request has been submitted".

## Verify the RITM
Verify Request number "REQ0010088", Requested item "RITM0010133", the item line "Standard Laptop · 15-inch Performance · macOS + dock", and Approval "Manager approval requested".
