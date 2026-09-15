---
mode: testing
url: https://my-testing-repo-main.vercel.app/chase-clone-app?reset=true
max_steps: 50
tags: [chase, banking, documents]
---

# Chaise Bank 23.4: Statement download

Catalog objective: download last month's statement PDF.
Key assertion: the PDF downloads and is non-empty.

## Sign in
Type "priya.nair" into "Username", "Bank2026!" into "Password", click "Sign in", type "483921" into "One-time code", and click "Verify and sign in".

## Open the statements page
Go to https://my-testing-repo-main.vercel.app/chase-clone-app/statements and verify the available statements list includes "August 2026" for "Total Checking".

## Download it
Click "Download PDF" on the August 2026 Total Checking statement and verify a notice says the statement for August 2026 was downloaded with a byte count.

## Verify the file is non-empty
Verify the statement row now shows a byte count greater than zero, and the download history lists "August 2026 · Total Checking" with that same byte count.
