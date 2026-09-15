---
test: ../offline-sync_test.md
status: passed
started: 2026-09-15T07:07:10.823Z
duration_s: 36
session_id: 667ecedd-d570-4304-bee4-2e8affd62cb1
---

# Drively 45.4: Offline mode edit sync — Result

## Go offline ✓ passed (1.76s)
md5: c899185678bb2b93f14675443af39500
Go to https://my-testing-repo-main.vercel.app/google-drive/offline-sync?reset=true, click "Go offline", and verify the network badge reads "Offline".

## Edit offline ✓ passed (0.31s)
md5: c17321c0e50f0580a4fe77db8d06bef7
Add a new line "- Rain jacket" at the end of the document and verify the status "Offline · changes saved on this device" while the server copy does not contain "Rain jacket".

## Reconnect ✓ passed (0.63s)
md5: aadcf313da3b2eec6cb40920d733fb67
Click "Reconnect" and wait for the status to read "All changes saved in Drively".

## Verify sync ✓ passed (31.1s)
md5: 10349d270c0f176075f471afbf973253
Verify the Drively server copy now ends with "- Rain jacket" and "Last synced" reads "Sep 14, 10:05 AM".
