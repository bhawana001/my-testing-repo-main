---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack/file-upload-preview?reset=true
max_steps: 45
tags: [slack, work-collab, feed]
---

# Slacky 35.2: File upload and preview

Catalog objective: upload an image and verify the inline preview.
Key assertion: the preview renders and the file is downloadable.

## Attach the image
Go to https://my-testing-repo-main.vercel.app/slack/file-upload-preview?reset=true, click "+ team-offsite.svg" in the composer, type "Offsite group photo" into the message box, and verify the composer shows "📎 team-offsite.svg".

## Send
Click "Send" and verify a new message from Demo User "Offsite group photo" with an inline image preview and the caption "team-offsite.svg · 2 KB".

## Download
Click "Download" under the image and verify "Downloaded team-offsite.svg."
