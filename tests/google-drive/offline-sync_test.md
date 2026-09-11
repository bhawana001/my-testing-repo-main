---
mode: testing
url: https://my-testing-repo-main.vercel.app/google-drive/offline-sync?reset=true
max_steps: 45
tags: [google-drive, docs-productivity, custom]
---

# Drively 45.4: Offline mode edit sync

Catalog objective: edit offline and verify sync on reconnect.
Key assertion: the offline edit appears after reconnection.

## Go offline
Go to https://my-testing-repo-main.vercel.app/google-drive/offline-sync?reset=true, click "Go offline", and verify the network badge reads "Offline".

## Edit offline
Add a new line "- Rain jacket" at the end of the document and verify the status "Offline · changes saved on this device" while the server copy does not contain "Rain jacket".

## Reconnect
Click "Reconnect" and wait for the status to read "All changes saved in Drively".

## Verify sync
Verify the Drively server copy now ends with "- Rain jacket" and "Last synced" reads "Sep 14, 10:05 AM".
