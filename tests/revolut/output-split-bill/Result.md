---
test: ../split-bill_test.md
status: passed
started: 2026-09-12T04:28:06.928Z
duration_s: 7601
session_id: 7caa6ab9-4a05-4cd5-8015-2c4c3a84b574
---

# Revolute 19.3: Payment split bill — Result

## Open the transaction ✓ passed (206.2s)
md5: 3d5b8cc2252a8ce5d48d9a418bf1fb3e
Go to https://my-testing-repo-main.vercel.app/revolut/split-bill?reset=true and verify the transaction "Trattoria Roma" for "−$84.00" is shown with a "Split bill with" list of contacts.

## Pick one contact ✓ passed (41.2s)
md5: edacb566beef5d1fee4e90b21fe1274a
Check "Priya Nair" and verify the line "Split 2 ways" reads "$42.00 each".

## Send the request ✓ passed (24.2s)
md5: b79964d1e7136aa6f59b66783f21a72a
Click "Request $42.00 from 1 person" and verify the message "Requests sent." appears.

## Verify the request amount ✓ passed (51.5s)
md5: fe8be159a51ab991cc13aa6363f136ec
Verify the requests list shows "Priya Nair" with "$42.00" (half of $84.00) and the status "Requested".
