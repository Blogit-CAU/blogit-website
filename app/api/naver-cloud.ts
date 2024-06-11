'use server';

const NAVER_CLOUD_URL = 'https://naveropenapi.apigw.ntruss.com/nmt';

interface PapagoTranslationResponse {
  message: {
    result: {
      srcLangType: string;
      tarLangType: string;
      translatedText: string;
    };
  };
}

export async function papagoTranslation(text: string) {
  const source = 'ko';
  const target = 'en';

  return (await fetch(`${NAVER_CLOUD_URL}/v1/translation`, {
    method: 'POST',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOUD_CLIENT_ID!,
      'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOUD_CLIENT_SECRET!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source,
      target,
      text,
    }),
  }).then((res) => res.json())) as PapagoTranslationResponse;
}
