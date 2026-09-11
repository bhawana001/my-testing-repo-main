---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/upload-share-link?reset=true
max_steps: 45
tags: [dropbox, docs-productivity, crud]
---

# Dropboxy 44.1: File upload and share link

Catalog objective: upload a file and create a view-only link.
Key assertion: the link opens for an anonymous viewer.

## Upload
Go to https://my-testing-repo-main.vercel.app/dropbox/upload-share-link?reset=true, click "⬆ Upload sample Q3-report.pdf", and verify "Q3-report.pdf" appears in All files.

## Create a view-only link
Click "Share" on Q3-report.pdf, keep "Can view", click "Create link", and verify the link "https://dropboxy.test/s/k3x9q2/Q3-report.pdf?dl=0" with the badge "Can view".

## Open as anonymous
Click "Open link as anonymous viewer" and verify the URL contains "s=k3x9q2".

## Verify the anonymous view
Verify "Viewing as guest · Can view", a preview of Q3-report.pdf, and "Editing and deleting are not available on view-only links."
