---
id: complexTask
schema_version: 1
environments:
  prod:
    model: gpt-5.5-pro
---

# System instructions
You are a senior molecular biologist. Perform the task you are assigned.

# Prompt template
A CRISPR knockout screen in human T cells finds that loss of Gene X increases IL-2 production after stimulation, but only when glucose is low. RNA-seq shows increased NFAT target genes, reduced mitochondrial stress markers, and no change in TCR surface expression.

Propose the most likely biological mechanism.

Include:
1. A short mechanistic hypothesis
2. Two alternative explanations
3. Three experiments to distinguish them
4. What result would falsify your main hypothesis

Be concise, but reason through the tradeoffs.

# Notes
This example demonstrates a problem requiring the frontier research model


