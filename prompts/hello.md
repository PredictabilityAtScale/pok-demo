---
id: hello
includes:
  - ./shared/tone.md
context:
  inputs:
    - name: name
      max_size: 50
      non_empty: true
    - name: app_context
      max_size: 100
      non_empty: true
environments:
  prod:
    model: gpt-5.4
    reasoning:
      effort: low
    sampling:
      temperature: 0.2
    cache:
      openai:
        prompt_cache_key: support-v1
        retention: in_memory
---

# System instructions

You are a friendly assistant. Be helpful and concise.
Current app context: {{ app_context }}.

# Prompt template

Say hello to {{ name }} and ask how you can help them today.
