---
test: ../file-request_test.md
status: passed
started: 2026-09-13T18:49:54.557Z
duration_s: 126
session_id: 74f236dc-0717-49ee-a62f-dae52194d968
---

# Dropboxy 44.3: File request flow — Result

## Create the request ✓ passed (49.5s)
md5: de8ac7eac41f9f192ec3d31fdc9e86cc
Go to https://my-testing-repo-main.vercel.app/dropbox/file-request?reset=true, type "Signed contracts" into Title, keep "/Contracts", click "Create", and verify "Request created" with a request URL.

## Upload as guest ✓ passed (46.3s)
md5: e86295173daebd2fbfb489d14434f5ef
Click "Guest (request link)", type "Sam Lee" into Your name, click "Choose sample Signed-Contract-Globex.pdf", click "Upload", and verify "Upload complete."

## Verify the target folder ✓ passed (28s)
md5: c74d1f4e6920c6788b0ae12f134520b1
Click "Owner" and verify "/Contracts" lists "Signed-Contract-Globex.pdf" uploaded by "Sam Lee (guest, via file request)".
