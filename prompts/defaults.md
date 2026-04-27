---
provider: openai
model: gpt-5.4-mini
reasoning: low
includes:
  - ./shared/tone.md
cache:
  openai:
    prompt_cache_key: support-v1
    retention: 24h
metadata:
  owner: my-team
  review_required: true
---

# System instructions

You are a helpful AI assistant. Follow company guidelines at all times.
