---
test: ../share-to-web_test.md
status: passed
started: 2026-09-13T16:44:38.120Z
duration_s: 120
session_id: b0cd0ae5-d1b0-41f3-b3d0-ca67678b3abf
---

# Notionly 38.3: Share to web publish — Result

## Open Share ✓ passed (24.8s)
md5: acef48d8884cf106bc7cf8d91ad64132
Go to https://my-testing-repo-main.vercel.app/notion/share-to-web?reset=true, click "Share", and verify a Publish panel with a "Publish to web" switch that is off.

## Publish ✓ passed (39.2s)
md5: 4e070825edd23e0757a965cac050e15b
Turn on "Publish to web" and verify the badge "🌐 Published" and the public link "https://demo.notionly.site/q3-roadmap-8a1f".

## Open the public link ✓ passed (25.6s)
md5: 17217575821945ea0b301461b7a666a5
Click "Open public link" and verify the URL now contains "public=q3-roadmap-8a1f".

## Verify the public page ✓ passed (28.4s)
md5: cc1fe3f38b7096061df79032b0fda8b0
Verify the badge "Public page · viewing without signing in", the content "🚀 Q3 Roadmap" with "Self-serve onboarding", and that the workspace sidebar and Share button are not shown.
