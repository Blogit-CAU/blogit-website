import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const POST_PROMPT = (code: string) =>
  `아래 내용을 Markdown(.md) 형식에 맞추어 medium style technology post로 작성해줘 그리고 아래 목차에 맞춰서 글을 구성해줘 1.  글 목차 2. 글 주제 3. 코드와 관련된 개념 4. 코드의 각 줄별 의미 5. 최종 정리 및 결론  \`\`\`  ${code}  \`\`\`   `;

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_TOKEN || '',
  dangerouslyAllowBrowser: true,
});

export async function generatePost(input: string) {
  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: POST_PROMPT(input),
      },
    ],
  });
}
