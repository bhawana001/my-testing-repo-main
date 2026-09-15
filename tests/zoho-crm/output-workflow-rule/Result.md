---
test: ../workflow-rule_test.md
status: passed
started: 2026-09-13T13:36:01.001Z
duration_s: 90
session_id: 630948f5-e0d4-4a1e-8ae8-c35a4b98be57
---

# Zohoo CRM 32.2: Workflow rule trigger — Result

## Review the rule ✓ passed (20.9s)
md5: a359eec98548a87a9c7a5ea36da8cc26
Go to https://my-testing-repo-main.vercel.app/zoho-crm/workflow-rule?reset=true and verify the rule "Trade show leads" sets "Rating = Hot · Lead Owner = Priya Nair" when Lead Source = Trade Show, and the workflow log says "No rules have fired yet."

## Create a trade show lead ✓ passed (41.6s)
md5: 660ae62ed61d86e558bbfd788b62ae04
Click "+ Create Lead", type "Park" into Last Name and "Vertex AI" into Company, select "Trade Show" for Lead Source, click "Create", and verify lead "LD-2" appears.

## Verify the auto-update ✓ passed (25.5s)
md5: 8fd2f4f863adc8c2133e440fe85fbb77
Verify LD-2 shows Rating "Hot" with "updated by workflow", Owner "Priya Nair", and the workflow log reads "Rule “Trade show leads” fired on LD-2: Rating → Hot, Owner → Priya Nair".
