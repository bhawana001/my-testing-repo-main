---
mode: testing
url: https://my-testing-repo-main.vercel.app/notion/template-duplication?reset=true
max_steps: 45
tags: [notion, work-collab, crud]
---

# Notionly 38.4: Template duplication

Catalog objective: duplicate a template into the workspace.
Key assertion: the template content is copied to a new page.

## Browse templates
Go to https://my-testing-repo-main.vercel.app/notion/template-duplication?reset=true and verify the gallery shows "Weekly meeting notes", "Project brief" and "Bug tracker".

## Preview
Click "Preview" on "Project brief" and verify sections "Problem", "Goals" and "Timeline" with to-dos "Define success metrics" and "Align stakeholders".

## Use the template
Click "Use this template" and verify a new page "📋 Project brief (copy)" opens and appears in the sidebar.

## Verify copied content
Verify the new page shows "Created from template: Project brief" and contains "Problem", "Goals", "Define success metrics", "Align stakeholders" and "Timeline".
