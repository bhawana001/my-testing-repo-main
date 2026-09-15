---
test: ../record-edit-overlay_test.md
status: passed
started: 2026-09-13T13:01:52.235Z
duration_s: 166
session_id: 845c2ac2-9f47-4d1b-b84e-5ea17ec48696
---

# Salesforze 28.4: Record edit through overlay — Result

## Open the account ✓ passed (24.1s)
md5: 00ad70bfd3abf45a2f958ded182c6c4e
Go to https://my-testing-repo-main.vercel.app/salesforce/record-edit-overlay?reset=true and verify the account "Globex Corporation" shows Phone "(555) 010-4400" and Industry "Manufacturing".

## Edit ✓ passed (36.7s)
md5: 6c4f1f61e4c512bcaa0e6f40871137fd
Click "Edit", wait for the "Loading record…" overlay to disappear, and verify the edit form with a Phone field is shown.

## Change and save ✓ passed (48.1s)
md5: fa8cbd62ab2e8a67b879511a2ba3be5c
Change Phone to "(555) 010-9999", select "Technology" for Industry, click "Save", wait for the "Saving…" and "Refreshing…" overlays to finish, and verify a confirmation message saying the account Globex Corporation was saved.

## Verify after reload ✓ passed (55.2s)
md5: 8765ba6e75adc24ea91034a377e9c3fb
Reload the page without the reset parameter and verify Phone reads "(555) 010-9999" and Industry reads "Technology".
