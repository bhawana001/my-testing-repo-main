---
test: ../add-recipient_test.md
status: passed
started: 2026-09-13T11:30:41.062Z
duration_s: 210
session_id: 8efb2213-d0e8-4c58-86bb-d641f49644ca
---

# Wyse 15.2: Recipient add and verify — Result

## Open the recipient form ✓ passed (18.8s)
md5: 2d438c4064d4231cb423f11b6b72ffd8
Go to https://my-testing-repo-main.vercel.app/wise/add-recipient?reset=true and verify the "Add a recipient" wizard is on the step "Who are you sending to?" and the "Send money · choose recipient" dropdown lists only "Ravi Menon · ••••4410".

## Who step ✓ passed (37.5s)
md5: e82ee6e200c276cea6c05926f314f479
Choose "Someone else", type "Asha Rao" into "Full name of the account holder", click "Continue", and verify the step "Bank account details (INR)" is shown.

## Bank details with an invalid IFSC ✓ passed (41.1s)
md5: 8dd2ec0fe113c7c2111e1f94a7a6e121
Type "123456789012" into Account number and into Confirm account number, type "bad" into IFSC code, click "Continue", and verify the validation message "IFSC must look like HDFC0001234." is shown.

## Fix the IFSC and review ✓ passed (48s)
md5: 80b8ca0a638ee5546d722cc959863ccb
Clear the IFSC code field, type "HDFC0001234", click "Continue", and verify the review step "Check the details" lists "Asha Rao", "123456789012" and "HDFC0001234".

## Save ✓ passed (23.8s)
md5: 1717b05755392f00b00adaa8c7572f94
Click "Save recipient" and verify the message "Recipient saved" with "Asha Rao (••••9012) can now receive transfers." appears.

## Verify selectable in a transfer ✓ passed (39.1s)
md5: 8ba3a4a2bdce1404997f56fb51277ade
In the "Send money · choose recipient" dropdown, select "Asha Rao · ••••9012" and verify the picked recipient shows Name "Asha Rao", Account "••••9012" and IFSC "HDFC0001234", with the note "2 saved recipients".
