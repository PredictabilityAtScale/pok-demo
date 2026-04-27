// Example: hash the exact LLM request body with MD5 and use it as a cache key.
// MD5 is appropriate here for cache identity, not for security-sensitive uses.

import { createHash } from 'node:crypto';

import { createPromptOpsKit } from 'promptopskit';

type CachedCompletion = {
  content: string;
  cachedAt: string;
};

const responseCache = new Map<string, CachedCompletion>();

async function fetchChatCompletion(serializedBody: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: serializedBody,
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  return data.choices?.[0]?.message?.content?.trim() ?? '';
}

async function getCachedOrFetchResponse(requestBody: unknown) {
  const serializedBody = JSON.stringify(requestBody);
  const cacheKey = createHash('md5').update(serializedBody, 'utf8').digest('hex');
  const cachedResponse = responseCache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse.content;
  }

  const content = await fetchChatCompletion(serializedBody);

  responseCache.set(cacheKey, {
    content,
    cachedAt: new Date().toISOString(),
  });

  return content;
}

async function main() {
  const kit = createPromptOpsKit({ sourceDir: './prompts' });
  const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

  const { request } = await kit.renderPrompt({
    path: 'hello',
    provider: 'openai',
    environment,
    variables: {
      name: 'World',
      app_context: 'Cache demo',
    },
  });

  const content = await getCachedOrFetchResponse(request?.body);

  console.log(content);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});