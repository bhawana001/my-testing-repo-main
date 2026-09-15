---
test: ../return-adjusts-installments_test.md
status: passed
started: 2026-09-13T11:26:53.278Z
duration_s: 125
session_id: 230b9d9e-14fb-4baa-9707-07c1852372cf
---

# Klarnah 14.4: Return adjusts installments — Result

## Open the order ✓ passed (39.3s)
md5: 4b1da315c9f78c43990658bac42f0dfa
Go to https://my-testing-repo-main.vercel.app/klarna/return-adjusts-installments?reset=true and verify "Original total" $180.00, "Remaining balance" $135.00, and instalments 2, 3 and 4 each "$45.00" marked "Upcoming".

## Report a return ✓ passed (42.7s)
md5: dbe875f6211d4afa80046adc7339e551
Click "Report a return", check "Linen lamp shade · $60.00", choose "Changed my mind" as the reason, click "Register return", and verify the message "Return registered for Linen lamp shade." appears.

## Verify the recalculated schedule ✓ passed (41.7s)
md5: b65e9c05beca923c42e0bec88ff3ed9c
Verify "Returned" reads "−$60.00", "Remaining balance" reads "$75.00", instalment 1 stays "$45.00" "Paid", and instalments 2, 3 and 4 each read "$25.00".
