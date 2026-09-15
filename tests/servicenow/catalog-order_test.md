---
mode: testing
url: https://my-testing-repo-main.vercel.app/servicenow-clone-app/catalog?reset=true
max_steps: 45
tags: [servicenow, itsm, catalog]
---

# ServiceNau 34.3: Service catalog order

Catalog objective: order a catalog item with form variables.
Key assertion: a request is created with a RITM number.

## Open the catalog item
Click "Order" on "Standard laptop" and verify an order form appears with the variables "Model", "Memory" and "Business justification".

## Verify the mandatory variables are enforced
Click "Order now" and verify a red banner reads "These variables are mandatory: Model, Memory, Business justification."

## Fill in the variables
Select "16 inch workstation" in "Model", select "32 GB" in "Memory", type "Replacing a failed machine on the CAD team." into "Business justification", and click "Order now".

## Verify the RITM and its variables
Verify a green card titled "Request submitted" shows "Requested item number" of "RITM0008810", "Item" of "Standard laptop", "Requested for" of "Priya Nair", "Stage" of "Fulfilment", and variables "Model" of "16 inch workstation", "Memory" of "32 GB" and "Business justification" of "Replacing a failed machine on the CAD team."
