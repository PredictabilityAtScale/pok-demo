---
id: simpleTask
schema_version: 1
context:
  inputs:
    - name: biology_text
      non_empty: true
---

# System instructions
You are a senior molecular biologist. Perform the task you are assigned.

# Prompt template
Classify this biology text as one of:

- plant
- animal
- bacteria
- virus
- unknown

Return only the category.

Text:
{{biology_text}}

# Notes
This example demonstrates a problem requiring the frontier research model

Input biology_text: E. coli is a single-celled organism commonly found in the gut.

Output: bacteria
