---
test: ../calculators-header-link-navigates-to-open-account_test.md
status: passed
started: 2026-08-27T14:21:14.055Z
duration_s: 215
session_id: efbcef65-3e7c-44ed-b58c-a72d7d11f7cd
---

# Calculators header link navigates to Open Account — Result

## Step 1 ✓ passed (32.6s)
md5: f3bd5b82760f748bec7cdd49b1f6b436
Open {{calculators_page_url}} in the browser and wait until the Calculators page is fully loaded with the bank header visible at the top of the page.

## Step 2 ✓ passed (23.1s)
md5: d069af0b4f2544547353c7ceff93bebc
In the bank header on the Calculators page, follow the Open Account link and allow the site to finish navigating to the destination page.

## Step 3 ✓ passed (18.4s)
md5: 9f06bf0618ed70f2049da516594318ed
On the loaded Open Account page, confirm that the bank header is still visible at the top of the page.

## Step 4 — assert ✓ passed (19.8s)
md5: 1ede6239a1a91b54017182458d421417
Confirm absolute check: /bank-clone-app/open-account (equals) — the stated promise: From the Calculators page, the header link to Open Account resolves to `/bank-clone-app/open-account`.
