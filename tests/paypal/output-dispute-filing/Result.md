---
test: ../dispute-filing_test.md
status: passed
started: 2026-09-13T10:54:58.857Z
duration_s: 116
session_id: 1b00bb6c-6fef-4670-9a2e-59ccdc745eff
---

# PayPally 10.4: Dispute filing — Result

## Choose the transaction ✓ passed (33.5s)
md5: 42379045f14ca6e6cd7c560d34c694c8
Go to https://my-testing-repo-main.vercel.app/paypal/dispute-filing?reset=true, choose "Retro Gadgets LLC · −$89.99", click "Continue", and verify "What's the problem?"

## Reason and details ✓ passed (33.4s)
md5: 4dbc241c79c6c67d3760be1c1fb89475
Choose "I didn't receive an item I bought", type "Tracking stopped updating 10 days ago." into "Tell us more", click "Continue", and verify the review step.

## Open the dispute ✓ passed (22.6s)
md5: a2eda04888353b91b4c1610791810078
Click "Open dispute" and verify "We've opened your dispute".

## Verify the case ✓ passed (24.5s)
md5: ebddcea933767acaf0988d7d0367f64f
Verify Case ID "PP-D-8999-INR", status "Open" and "Seller response due September 24, 2026".
