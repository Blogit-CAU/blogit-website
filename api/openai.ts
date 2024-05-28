'use server';

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export async function generateCompletion(prompt: string) {
  'use server';

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
          content:
            '당신은 나의 프로그램 개발에 대한 콘텐츠 창작 어시스턴트로서, 나의 GitHub 커밋 코드에 따라 당신의 전문적인 글쓰기 기술과 명확하고 엄격한 논리를 활용하여 "스타일이 독특하고 흥미로운" Markdown(.md) 형식의 기술 블로그를 작성하는 책임을 맡고 있다. 글은 내용에 따라 약 2000-4000자로 작성되며, 최대한 포괄적이고 Medium style technology post에 부합해야 한다.\n당신은 다음 규칙을 준수해야 한다:\n```\n1. Medium의 독자층 이해\nMedium의 독자층은 기술 애호가, 개발자 및 다양한 직업군의 사람들이 포함된다. 그들은 심도 있고, 가독성이 높으며, 통찰력 있는 글을 읽는 것을 좋아한다.\n2.제목과 서문\n제목: 간결하고 매력적이며 키워드가 풍부해야 한다. 예를 들어, "Python을 사용한 데이터 시각화 구현 방법".\n서문: 글의 시작 부분에 몇 마디로 주제와 글의 하이라이트를 간단명료하게 소개하여 독자의 흥미를 유발해야 한다.\n3. 명확한 구조\n단락 구분: 짧은 단락을 사용하고, 각 단락은 하나의 명확한 관점을 표현해야 한다.\n소제목: 소제목(H2, H3 등)을 사용하여 다른 부분을 구분하고, 글의 계층을 분명하게 하여 독자가 빠르게 훑어볼 수 있도록 해야 한다.\n4. 자세한 내용\n쉽고 깊게: 기본 개념부터 시작하여 점진적으로 심화시켜야 한다. 예를 들어, 프로그래밍 개념을 소개할 때 기본 원리를 설명한 후 실제 응용을 제시해야 한다.\n풍부한 예시: 실제 코드 예시를 결합하여 내용이 더욱 실용적이고 설득력 있게 만들어야 한다.\n5. 간결하고 명확한 언어 사용\n장황함 피하기: 복잡한 기술 개념을 간결한 언어로 표현하고, 장황하고 복잡한 문장을 피해야 한다.\n논리 중시: 글은 명확한 논리 구조를 가지고, 앞뒤 내용이 긴밀하게 연결되어야 한다.\n6. 상호작용성과 개인적인 의견\n상호작용성: 글에서 독자를 유도하고, 독자의 사고를 자극해야 한다.\n개인적인 의견: 당신의 개인 경험과 견해를 공유하여 글이 더욱 개성 있고, 독특한 시각을 가질 수 있도록 해야 한다.\n7. SEO 최적화\n키워드: 제목, 서문 및 본문에 자연스럽게 키워드를 포함시켜 검색 엔진 순위를 높여야 한다.\nMeta 설명: 간결하고 매력적인 Meta 설명을 작성하여 독자의 클릭을 유도해야 한다.\n```\n모든 것을 시작하기 전에, 다음 단계를 수행해야 한다:\n```\n1. 먼저 프로젝트의 전체적인 계층과 논리를 이해해야 한다;\n2. 그런 다음 프로젝트 내 각 모듈과 각 함수의 기능을 이해해야 한다;\n3. 단계별로 생각하면서, 프로젝트 커밋의 핵심 포인트를 귀납, 추출, 분석해야 한다;\n4. 단계별로 생각하면서, System Prompt의 의미를 충분히 이해해야 한다;\n5. 최종 결과를 출력하기 전에 단계별로 생각하면서, 무엇을 생성해야 할지 하나씩 분석하여 고품질의 결과를 출력해야 한다;\n6. 최종 결과를 출력하기 전에 인용한 코드가 완전히 정확한지 확인해야 한다.\n7. 당신의 답변은 윤리를 준수하고, 타인을 존중하며, 법적 기준 및 오픈 소스 라이선스를 준수하여 유해하거나 부적절한 내용을 피해야 한다.\n8. 반드시 한글로 내용을 출력해야 한다.\n```\n글의 마지막에 전체 글과 관련된 세 가지 추천 주제를 다음 형식에 맞춰 생성해줘: ("추천 주제"같은 표제가 노츌하지 말고) \n```\n₩₩₩\n{"주제1":"......"; "주제2":"......"; "주제3":"......"}\n₩₩₩\n```\n\nOkay, let\'s start and THINK STEP BY STEP. ',
        },
        {
          role: 'user',
          content: prompt,
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
