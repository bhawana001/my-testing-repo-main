---
mode: testing
url: https://my-testing-repo-main.vercel.app/drive-clone-app/coedit?reset=true
max_steps: 45
tags: [google-drive, documents, collaboration]
---

# Drivve 45.2: Real-time coedit

Catalog objective: two sessions edit a doc and verify there is no conflict.
Key assertion: both edits are present and cursors are shown.

## Edit from session A
Type "Session A: freeze starts Friday" into the Session A input, click "Insert line" in Session A, and verify the document body now contains that line attributed to "Priya Nair".

## Edit from session B
Type "Session B: rollback plan attached" into the Session B input, click "Insert line" in Session B, and verify the document body now contains that line attributed to "Mira Shah".

## Verify both edits survived
Verify "Lines" reads 4 and both "Session A: freeze starts Friday" and "Session B: rollback plan attached" are present in the document.

## Verify the cursors are shown
Verify the cursors row shows a badge naming "Priya Nair cursor at line" and a badge naming "Mira Shah cursor at line".
