---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/realtime-coedit?reset=true
max_steps: 45
tags: [google-drive, docs-productivity, custom]
---

# Drively 45.2: Real-time coedit

Catalog objective: two sessions edit a doc and verify there is no conflict.
Key assertion: both edits are present with cursors shown.

## Session A edits
Go to https://my-testing-repo-main.vercel.app/google-drive/realtime-coedit?reset=true, type "Day 1: strategy" into the Session A input, click "Add line" in Session A, and verify both panes show "Day 1: strategy".

## Session B edits
Type "Day 2: team building" into the Session B input, click "Add line" in Session B, and verify both panes show "Day 2: team building".

## Verify no conflict and cursors
Verify both panes contain "Offsite agenda", "Day 1: strategy" and "Day 2: team building", Session A shows Priya's cursor label "▏Priya", Session B shows "▏Demo", and the header says "0 conflicts".
