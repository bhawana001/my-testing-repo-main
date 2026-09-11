---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox/version-history?reset=true
max_steps: 45
tags: [dropbox, docs-productivity, crud]
---

# Dropboxy 44.4: Version history restore

Catalog objective: restore an older version of a file.
Key assertion: the file content reverts to the selected version.

## Open history
Go to https://my-testing-repo-main.vercel.app/dropbox/version-history?reset=true and verify the current content (v3) reads "Starter: $12/mo", "Pro: $35/mo", "Business: $120/mo" and versions v3, v2, v1 are listed.

## Preview v1
Click "Preview" on v1 and verify the preview shows "Starter: $9/mo".

## Restore v1
Click "Restore" on v1 and verify "Restored version 1. It's now the current version (v4)."

## Verify the content reverted
Verify the current content reads "Starter: $9/mo", "Pro: $29/mo" and "Business: $99/mo".
