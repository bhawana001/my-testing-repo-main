---
test: ../catalog-order_test.md
status: passed
started: 2026-09-13T13:55:42.183Z
duration_s: 127
session_id: 541fbe67-b2bb-4aed-b18a-20cc129cee63
---

# ServiceNowly 34.3: Service catalog order — Result

## Configure the item ✓ passed (45.2s)
md5: 0bec70e3f61948f5a475400a92559506
Go to https://my-testing-repo-main.vercel.app/servicenow/catalog-order?reset=true, choose the "15-inch Performance" model, select "macOS", check "Include docking station", click "Continue", and verify the step "Who is it for?" with Requested for "Demo User".

## Delivery details ✓ passed (27.8s)
md5: 5c7c5afdf21fd6966dabc5f838e6d29a
Select "HQ · Floor 7" for Delivery location, type "Design work needs more RAM." into Business justification, click "Continue", and verify the review step.

## Order ✓ passed (22.8s)
md5: 743db63d72366bd7deb70d220823d334
Click "Order Now" and verify "Thank you, your request has been submitted".

## Verify the RITM ✓ passed (29.7s)
md5: 05b308ec2d348a513cf73b6d193f302b
Verify Request number "REQ0010088", Requested item "RITM0010133", the item line "Standard Laptop · 15-inch Performance · macOS + dock", and Approval "Manager approval requested".
