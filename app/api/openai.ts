'use server';

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

const OPENAI_URL = 'https://api.openai.com/v1';

export interface ModerationResponse {
  id: string;
  model: string;
  results: Moderation[];
}

export interface Moderation {
  flagged: boolean;
  categories: {
    sexual: boolean;
    hate: boolean;
    harassment: boolean;
    "self-harm": boolean;
    "sexual/minors": boolean;
    "hate/threatening": boolean;
    "violence/graphic": boolean;
    "self-harm/intent": boolean;
    "self-harm/instructions": boolean;
    "harassment/threatening": boolean;
    violence: boolean;
  };
  category_scores: {
    sexual: number;
    hate: number;
    harassment: number;
    "self-harm": number;
    "sexual/minors": number;
    "hate/threatening": number;
    "violence/graphic": number;
    "self-harm/intent": number;
    "self-harm/instructions": number;
    "harassment/threatening": number;
    violence: number;
  }
}

export async function getModerations(text: string[]) {
  return await fetch(`${OPENAI_URL}/moderations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
    }),
  }).then((res) => res.json()) as ModerationResponse;
}

export async function generateCompletion(input: string, prompt: string) {
  const gptModel =
    process.env.NODE_ENV === 'production' ? 'gpt-4o' : 'gpt-3.5-turbo-0125';

  const stream = createStreamableValue('');
  (async () => {
    const { textStream } = await streamText({
      model: openai(gptModel),
      maxTokens: 2000,
      maxRetries: 3,
      temperature: 0.3,
      messages: [
        {
          role: 'assistant',
          content: prompt
        },
        {
          role: 'user',
          content: input,
        },
      ],
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
