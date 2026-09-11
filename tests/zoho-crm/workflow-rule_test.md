---
mode: testing
url: https://my-testing-repo-main.vercel.app/zoho-crm/workflow-rule?reset=true
max_steps: 40
tags: [zoho-crm, crm, crud]
---

# Zohoo CRM 32.2: Workflow rule trigger

Catalog objective: create a record that triggers a field update workflow.
Key assertion: the field is auto-updated per the rule.

## Review the rule
Go to https://my-testing-repo-main.vercel.app/zoho-crm/workflow-rule?reset=true and verify the rule "Trade show leads" sets "Rating = Hot · Lead Owner = Priya Nair" when Lead Source = Trade Show, and the workflow log says "No rules have fired yet."

## Create a trade show lead
Click "+ Create Lead", type "Park" into Last Name and "Vertex AI" into Company, select "Trade Show" for Lead Source, click "Create", and verify lead "LD-2" appears.

## Verify the auto-update
Verify LD-2 shows Rating "Hot" with "updated by workflow", Owner "Priya Nair", and the workflow log reads "Rule “Trade show leads” fired on LD-2: Rating → Hot, Owner → Priya Nair".
