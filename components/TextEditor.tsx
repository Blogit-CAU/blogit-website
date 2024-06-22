'use client';

import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { useCommitStore } from '@/store';
import { Headline_00 } from './Typography';
import { Button } from './Button';

import MDEditor from '@uiw/react-md-editor';
import { generateCompletion } from '@/app/api/openai';
import { readStreamableValue } from 'ai/rsc';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useFormState } from 'react-dom';
import { createPost } from '@/app/actions/post';
import { getPost } from '@/app/api/platform/post';
import { redirect, useRouter } from 'next/navigation';

export default function TextEditor({
  articleId,
  readOnly,
}: {
  articleId?: number;
  readOnly?: boolean;
}) {
  const router = useRouter();
  const { commits, setRecomText, recomText } = useCommitStore();

  const [message, formAction] = useFormState(createPost, undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const [separatedText, setSeparatedText] = useState<string>('');

  useEffect(() => {
    async function callGPT() {
      setIsLoading(true);

      const prompt = await fetch('/sysprompt.txt').then((res) => res.text());
      const { output } = await generateCompletion(
        JSON.stringify(commits),
        prompt,
      );

      let accumulatedText = '';
      let afterSeparator = false;

      for await (const delta of readStreamableValue(output)) {
        if (delta) {
          if (afterSeparator) {
            setSeparatedText((prev) => prev + delta);
          } else {
            accumulatedText += delta;
            const splitIndex = accumulatedText.indexOf('₩₩₩');
            if (splitIndex !== -1) {
              setText((prev) => prev.slice(0, -3));
              /*setText(
                (prev) => prev + accumulatedText.substring(0, splitIndex),
              );*/
              setSeparatedText(accumulatedText.substring(splitIndex));
              afterSeparator = true;
            } else {
              setText((prev) => prev + delta);
            }
          }
        }
      }

      setIsLoading(false);
      //handleRecom();
    }
    async function fetchArticle() {
      setIsLoading(true);

      if (articleId) {
        const article = await getPost(articleId);
        setTitle(article.title);
        setText(article.content);
      }

      setIsLoading(false);
    }

    if (articleId === undefined) {
      callGPT();
    } else {
      fetchArticle();
    }
  }, []);

  async function handleRecom() {
    process.env.NODE_ENV !== 'production' &&
      console.log('separatedText:', separatedText);
    //여기 text 마지막에 ₩₩₩로 구분된 주제 추천있음 -> 여기서 제외시키고 share page로 가져와야함
    const regex = /₩₩₩([\s\S]*)₩₩₩/;
    const match = separatedText.match(regex);
    let topicsText = '';
    if (match && match.length > 1) {
      topicsText = match[1];
    }
    //json 형식으로 만들기
    const jsonStr = topicsText.replace(/;/g, ',');
    process.env.NODE_ENV !== 'production' && console.log('jsonSTr: ', jsonStr);

    //임시 데이터
    //const jsonString =
    //  '{"주제1":"Jekyll을 이용한 블로그 구축 방법", "주제2":"Markdown을 사용한 문서 작성 팁", "주제3":"GitHub Pages로 프로젝트 문서 호스팅하기"}';

    //const jsonObject = JSON.parse(jsonString);
    const jsonObject = JSON.parse(jsonStr);
    const topicsArray: string[] = Object.values(jsonObject);

    setRecomText(topicsArray);
    process.env.NODE_ENV !== 'production' && console.log(topicsArray);
  }

  useEffect(() => {
    if (!isLoading && articleId === undefined && text !== '') {
      handleRecom();
    }
  }, [isLoading, articleId, text]);

  useEffect(() => {
    if (message === false) {
      //alert('오류가 발생하였습니다. 다시 시도해주세요.');
    } else if (message === true) {
      router.push('/post/share');
    }
  }, [message]);

  function handleDownload() {
    const fileContent = text;
    const blob = new Blob([fileContent], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.md`;

    link.click();

    URL.revokeObjectURL(link.href);
  }

  return (
    <>
      {isLoading && (
        <div className='flex items-center mb-4'>
          <div className='flex justify-center items-center mr-4'>
            <div className='border border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin'></div>
          </div>
          <Headline_00>GPT가 글을 작성중입니다...</Headline_00>
        </div>
      )}
      <form action={formAction}>
        <input
          type='text'
          name='title'
          placeholder='아티클의 제목을 입력해주세요'
          className='border rounded-lg p-2 w-[20rem] focus:outline-none mt-4'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          readOnly={readOnly}
        />
        <MDEditor
          textareaProps={{
            name: 'content',
            readOnly: readOnly,
          }}
          height={720}
          value={text}
          autoFocus={true}
          onChange={(v, e) => setText((prev) => (prev = v!))}
        />
        <div className='flex gap-4 p-10 '>
          <Button
            type='submit'
            size='L'
            backgroundColor='#74AA9C'
            className='h-10'
            disabled={isLoading || readOnly}
          >
            {'확인'}
          </Button>
          <Button
            size='L'
            backgroundColor='#95afa8'
            className='h-10'
            onClick={handleDownload}
            disabled={isLoading}
          >
            {'글 다운로드 하기'}
          </Button>
        </div>
      </form>
    </>
  );
}
