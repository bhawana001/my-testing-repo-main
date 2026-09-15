---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce-clone-app/accounts?reset=true
max_steps: 45
tags: [salesforce, crm, records]
---

# Salesfource 28.4: Record edit through the overlay

Catalog objective: edit an account field and save through the loading overlay.
Key assertion: the saved value persists after a reload.

## Open the record for editing
Verify the "Northwind Labs" account shows "Employees" of "240", then click "Edit" on it.

## Change a field
Replace "Employees" with "310" and select "Manufacturing" in "Industry".

## Save through the overlay
Click "Save" and verify the button shows a saving state before the record returns to its read-only view.

## Verify the value persisted after a reload
Verify "Employees" now reads "310" and "Industry" reads "Manufacturing", then reload https://my-testing-repo-main.vercel.app/salesforce-clone-app/accounts and verify both values are still there.
