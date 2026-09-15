---
mode: testing
url: https://my-testing-repo-main.vercel.app/dropbox-clone-app/requests?reset=true
max_steps: 45
tags: [dropbox, documents, collection]
---

# Dropbaks 44.3: File request flow

Catalog objective: create a file request and upload as a guest.
Key assertion: the file lands in the target folder.

## Create the request
Leave "What are you asking for" as "Send us your headshot", select "Launch assets" in "Files land in", click "Create request", and verify a green banner titled "File request created" shows "/dropbox-clone-app/r/r4820".

## Open the guest page
Click "Open it as a guest" and verify the page title reads "Send us your headshot" with the subtitle "Priya Nair is asking you for a file".

## Upload as the guest
Type "Sam Rivera" into "Your name", type "headshot.jpg" into "File name", click "Upload", and verify a green card titled "Thanks — your file was sent" appears.

## Verify the file landed in the target folder
Verify the confirmation shows "File" of "headshot.jpg", "Landed in" of "Launch assets" and "Uploaded by" of "Sam Rivera", then go to https://my-testing-repo-main.vercel.app/dropbox-clone-app/requests and verify the "Files received through requests" card lists "headshot.jpg" against "Launch assets · from Sam Rivera".
