---
test: ../holdings-pnl_test.md
status: passed
started: 2026-09-13T11:51:46.394Z
duration_s: 90
session_id: df453192-fd06-49b7-a909-ba059970cc13
---

# Zerodhi 17.3: Holdings P and L — Result

## Open holdings ✓ passed (25.5s)
md5: 7ebcb75aa4c7a66adbbbc3c00fc5ab95
Go to https://my-testing-repo-main.vercel.app/zerodha/holdings-pnl?reset=true and verify "Holdings (3)" lists INFX with qty 10, avg cost 1420.00, LTP 1540.00 and P&L "+₹1,200.00".

## Open the INFX breakdown ✓ passed (29.9s)
md5: 6997431c67bfd8a056963dd3addc6006
Click "INFX" and verify the breakdown shows Quantity 10, Average cost ₹1,420.00, LTP ₹1,540.00 and "Price delta (LTP − avg)" ₹120.00.

## Verify the formula ✓ passed (32.5s)
md5: a0def82f21c54e5c2650e26710c4e287
Verify the line "P&L = qty × delta" reads "10 × ₹120.00 = ₹1,200.00", matching the table's INFX P&L.
