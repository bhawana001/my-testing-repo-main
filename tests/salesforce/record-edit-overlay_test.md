---
mode: testing
url: https://my-testing-repo-main.vercel.app/salesforce/record-edit-overlay?reset=true
max_steps: 40
tags: [salesforce, crm, crud]
---

# Salesforze 28.4: Record edit through overlay

Catalog objective: edit an account field and save through loading overlays.
Key assertion: the saved value persists after reload.

## Open the account
Go to https://my-testing-repo-main.vercel.app/salesforce/record-edit-overlay?reset=true and verify the account "Globex Corporation" shows Phone "(555) 010-4400" and Industry "Manufacturing".

## Edit
Click "Edit", wait for the "Loading record…" overlay to disappear, and verify the edit form with a Phone field is shown.

## Change and save
Change Phone to "(555) 010-9999", select "Technology" for Industry, click "Save", wait for the "Saving…" and "Refreshing…" overlays to finish, and verify the message "Account \"Globex Corporation\" was saved."

## Verify after reload
Reload the page without the reset parameter and verify Phone reads "(555) 010-9999" and Industry reads "Technology".
