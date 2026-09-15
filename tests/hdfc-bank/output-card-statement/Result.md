---
test: ../card-statement_test.md
status: passed
started: 2026-09-13T12:29:50.671Z
duration_s: 116
session_id: fe674ed9-f49d-477f-905f-bb154e6e853a
---

# HDFB Bank 24.4: Credit card statement view — Result

## Open the statement ✓ passed (24.3s)
md5: 3d0d5e1192567c286547eff8cec8e0f9
Go to https://my-testing-repo-main.vercel.app/hdfc-bank/card-statement?reset=true and verify the page "Credit card statement" for "Regalia Credit Card •••• 5520" shows a Transactions table with six rows including "INDIGO AIRWAYS" for "₹12,450.00" and a credit "PAYMENT RECEIVED - THANK YOU" of "₹15,000.00".

## Verify the totals match ✓ passed (43.6s)
md5: 4bdc45123161ea3f9aa88b481bf8d5aa
Verify the table footer "Total amount due" reads "₹8,212.25" and the Summary card's "Total amount due" also reads "₹8,212.25".

## Verify due date and minimum due ✓ passed (46.8s)
md5: 8df92102e3e4a2578b58c16b4a07379b
Verify the Summary shows "Payment due date" as "21 Sep 2026" and "Minimum amount due (5%)" as "₹410.61".
