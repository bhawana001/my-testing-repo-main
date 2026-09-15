---
mode: testing
url: https://my-testing-repo-main.vercel.app/drive-clone-app/offline?reset=true
max_steps: 45
tags: [google-drive, documents, sync]
---

# Drivve 45.4: Offline mode edit sync

Catalog objective: edit offline and verify the change syncs on reconnect.
Key assertion: the offline edit appears after reconnection.

## Go offline
Click "Go offline" and verify the connection badge reads "Offline" with an amber banner saying edits are stored on this device.

## Make an edit while offline
Type "Added while offline" into the line box, click "Save line", and verify an amber banner says the edit is queued and will sync when you reconnect.

## Verify the edit is queued, not saved
Verify "Queued edits" reads 1, the "Pending sync" card lists "Added while offline", and the Document card still shows "Lines saved to Drivve" of 2.

## Reconnect and verify the sync
Click "Reconnect" and verify a green banner reads "Back online — 1 queued edit synced.", "Queued edits" reads 0, and "Lines saved to Drivve" reads 3 with the line "Added while offline" present.
