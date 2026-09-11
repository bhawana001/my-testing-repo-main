---
mode: testing
url: https://my-testing-repo-main.vercel.app/wise/add-recipient?reset=true
max_steps: 40
tags: [wise, payments-infra, wizard]
---

# Wyse 15.2: Recipient add and verify

Catalog objective: add a bank recipient with account details.
Key assertion: the recipient is saved and selectable in a transfer.

## Open the recipient form
Go to https://my-testing-repo-main.vercel.app/wise/add-recipient?reset=true and verify the "Add a recipient" wizard is on the step "Who are you sending to?" and the "Send money · choose recipient" dropdown lists only "Ravi Menon · ••••4410".

## Who step
Choose "Someone else", type "Asha Rao" into "Full name of the account holder", click "Continue", and verify the step "Bank account details (INR)" is shown.

## Bank details with an invalid IFSC
Type "123456789012" into Account number and into Confirm account number, type "bad" into IFSC code, click "Continue", and verify the validation message "IFSC must look like HDFC0001234." is shown.

## Fix the IFSC and review
Clear the IFSC code field, type "HDFC0001234", click "Continue", and verify the review step "Check the details" lists "Asha Rao", "123456789012" and "HDFC0001234".

## Save
Click "Save recipient" and verify the message "Recipient saved" with "Asha Rao (••••9012) can now receive transfers." appears.

## Verify selectable in a transfer
In the "Send money · choose recipient" dropdown, select "Asha Rao · ••••9012" and verify the picked recipient shows Name "Asha Rao", Account "••••9012" and IFSC "HDFC0001234", with the note "2 saved recipients".
