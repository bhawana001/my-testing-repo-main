---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion-clone-app/page/home?reset=true
max_steps: 40
tags: [notion, work-collab, sharing]
---

# Notiond 38.3: Share to web publish

Catalog objective: publish a page to the web and open the public link.
Key assertion: the public page renders without authentication.

## Verify the page is private first
Go to https://my-testing-repo-main.vercel.app/notion-clone-app/public/home and verify the page title reads "Not published" and says the owner has not published it to the web.

## Publish the page
Go to https://my-testing-repo-main.vercel.app/notion-clone-app/page/home, tick "Publish to web" in the Share card, and verify a "Public link" of "/notion-clone-app/public/home" now appears.

## Open the public link
Click "Open the public page" and verify the page shows the title "Team home" with the subtitle "Published to the web".

## Verify it renders with no sign-in
Verify the public page shows a badge reading "Public page — no sign-in required", "Blocks" of 2, and the text "Everything the team needs, in one place."
