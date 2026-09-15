---
test: ../upload-share-link_test.md
status: passed
started: 2026-09-13T18:45:01.178Z
duration_s: 111
session_id: b36cde04-dc71-4498-9268-a00e1dc34324
---

# Dropboxy 44.1: File upload and share link — Result

## Upload ✓ passed (24.9s)
md5: 6233670fd10e7554b6b53146746096c3
Go to https://my-testing-repo-main.vercel.app/dropbox/upload-share-link?reset=true, click "⬆ Upload sample Q3-report.pdf", and verify "Q3-report.pdf" appears in All files.

## Create a view-only link ✓ passed (32.3s)
md5: e5d7d7575b82500100e92ce72fe4737e
Click "Share" on Q3-report.pdf, keep "Can view", click "Create link", and verify the link "https://dropboxy.test/s/k3x9q2/Q3-report.pdf?dl=0" with the badge "Can view".

## Open as anonymous ✓ passed (23.8s)
md5: d0295b39947f081c1324afdf1d33606d
Click "Open link as anonymous viewer" and verify the URL contains "s=k3x9q2".

## Verify the anonymous view ✓ passed (28.2s)
md5: 5be26ec71f32371e5318f3ad71ce5911
Verify "Viewing as guest · Can view", a preview of Q3-report.pdf, and "Editing and deleting are not available on view-only links."
