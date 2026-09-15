---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox-clone-app/versions?reset=true
max_steps: 40
tags: [dropbox, documents, versioning]
---

# Dropbaks 44.4: Version history restore

Catalog objective: restore an older version of a file.
Key assertion: the file content reverts to the selected version.

## Verify the current content
With "launch-brief.txt" selected, verify "Current version" reads 3 and the current content contains "Launch brief — version 3" and "Audience: existing customers".

## Verify the version list
Verify three versions are listed, with Version 1 reading "Audience: everyone", Version 2 reading "Audience: enterprise" and Version 3 marked "Current".

## Restore version 1
Click "Restore" on Version 1 and verify a green banner reads "launch-brief.txt restored to version 1."

## Verify the content reverted
Verify "Current version" now reads 4, the current content contains "Launch brief — version 1" and "Audience: everyone", and Version 4 carries the note "Restored from version 1".
