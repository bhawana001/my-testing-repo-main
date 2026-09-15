---
mode: testing
url: https://my-testing-repo-main.vercel.app/drive-clone-app/search?reset=true
max_steps: 40
tags: [google-drive, documents, search]
---

# Drivve 45.3: Search across drive

Catalog objective: search by keyword with a file type filter.
Key assertion: the results match both the type and the content.

## Search by keyword
Type "launch" into "Keyword", leave "File type" on "Any type", click "Search", and verify the Results card shows "Matches" of 3.

## Verify the keyword matches
Verify the results table lists "Launch plan", "Launch deck" and "Launch banner".

## Add a file type filter
Select "Presentation" in "File type", click "Search", and verify "Matches" now reads "1 of type Presentation".

## Verify the filtered result
Verify the only row is "Launch deck" with the type badge "Presentation".
