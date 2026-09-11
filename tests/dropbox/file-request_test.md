---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/file-request?reset=true
max_steps: 45
tags: [dropbox, docs-productivity, wizard]
---

# Dropboxy 44.3: File request flow

Catalog objective: create a file request and upload as a guest.
Key assertion: the file lands in the target folder.

## Create the request
Go to https://my-testing-repo-main.vercel.app/dropbox/file-request?reset=true, type "Signed contracts" into Title, keep "/Contracts", click "Create", and verify "Request created" with a request URL.

## Upload as guest
Click "Guest (request link)", type "Sam Lee" into Your name, click "Choose sample Signed-Contract-Globex.pdf", click "Upload", and verify "Upload complete."

## Verify the target folder
Click "Owner" and verify "/Contracts" lists "Signed-Contract-Globex.pdf" uploaded by "Sam Lee (guest, via file request)".
