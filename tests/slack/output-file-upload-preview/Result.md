---
test: ../file-upload-preview_test.md
status: passed
started: 2026-09-13T14:03:05.158Z
duration_s: 121
session_id: feb0a5ba-0760-48a4-895e-fc6757aef457
---

# Slacky 35.2: File upload and preview — Result

## Attach the image ✓ passed (39.2s)
md5: d8b6a90ab947376ece3992565b789f2d
Go to https://my-testing-repo-main.vercel.app/slack/file-upload-preview?reset=true, click "+ team-offsite.svg" in the composer, type "Offsite group photo" into the message box, and verify the composer shows "📎 team-offsite.svg".

## Send ✓ passed (47.8s)
md5: b95f639d1a7f57866867759a26155891
Click "Send" and verify a new message from Demo User "Offsite group photo" with an inline image preview and the caption "team-offsite.svg · 2 KB".

## Download ✓ passed (31.5s)
md5: 6fa49470e4417e25bc3f1c5f706a4714
Click "Download" under the image and verify "Downloaded team-offsite.svg."
