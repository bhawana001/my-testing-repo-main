---
mode: testing
url: https://my-testing-repo-main.vercel.app/slack-clone-app/files?reset=true
max_steps: 40
tags: [slack, work-collab, files]
---

# Slaick 35.2: File upload and preview

Catalog objective: upload an image and verify the inline preview.
Key assertion: the preview renders and the file is downloadable.

## Choose the destination channel
Select "#design" in the "Channel" dropdown and verify the dropdown now reads "#design".

## Attach the image
Click "Attach checkout-spec.png" and verify a green banner reads "checkout-spec.png uploaded to #design".

## Verify the inline preview
Verify the "Uploaded files" card lists "checkout-spec.png" with a "#design" badge and an inline image preview rendered beneath the file name.

## Verify the file is downloadable
Verify a "Download" link is present on the "checkout-spec.png" row.
