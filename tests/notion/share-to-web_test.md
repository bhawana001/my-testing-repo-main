---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/share-to-web?reset=true
max_steps: 45
tags: [notion, work-collab, custom]
---

# Notionly 38.3: Share to web publish

Catalog objective: publish a page to the web and open the public link.
Key assertion: the public page renders without auth.

## Open Share
Go to https://my-testing-repo-main.vercel.app/notion/share-to-web?reset=true, click "Share", and verify a Publish panel with a "Publish to web" switch that is off.

## Publish
Turn on "Publish to web" and verify the badge "🌐 Published" and the public link "https://demo.notionly.site/q3-roadmap-8a1f".

## Open the public link
Click "Open public link" and verify the URL now contains "public=q3-roadmap-8a1f".

## Verify the public page
Verify the badge "Public page · viewing without signing in", the content "🚀 Q3 Roadmap" with "Self-serve onboarding", and that the workspace sidebar and Share button are not shown.
