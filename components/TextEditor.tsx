'use client';

import React, { useEffect, useState } from 'react';
//import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// import { generatePost } from '@/api/openai';
import { useCommitStore } from '@/store';
import { Headline_00 } from './Typography';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/post';
import { useChat } from 'ai/react';

import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { generateCompletion } from '@/api/openai';
import { readStreamableValue } from 'ai/rsc';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function TextEditor() {
  const router = useRouter();
  const commitStore = useCommitStore();
  const postStore = usePostStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    async function init() {
      setIsLoading(true);

      const streamableCompletion = await generateCompletion(JSON.stringify(commitStore.commits));
      for await (const text of readStreamableValue(streamableCompletion)) {
        setText(text ?? '');
      }

      setIsLoading(false);
    }
    init();
  }, []);

  function handleDownload() {
    const htmlText = <MDEditor resource={text} />;
    postStore.add(htmlText.props.resource);
    console.log(htmlText.props.resource);

    const fileName = 'mypost.md';
    const fileContent = htmlText.props.resource;
    //다운로드는 되는데 한글 깨짐

    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain' });
    window.open(URL.createObjectURL(file), 'post_download');
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  }

  const handleClick = () => {
    postStore.add(text);
    router.push('/post/share');
  };

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
        <MDEditor 
          height={400} 
          value={text}
          onChange={(v, e) => setText(prev => prev = v!)}
        />
      <div className='flex gap-4 p-10 '>
        <Button
          size='L'
          backgroundColor='#74AA9C'
          className='h-10'
          onClick={handleClick}
          disabled={isLoading}
        >
          {'확인'}
        </Button>
        <Button
          size='L'
          backgroundColor='#95afa8'
          className='h-10'
          onClick={handleDownload}
        >
          {'글 다운로드 하기'}
        </Button>
      </div>
    </>
  );
}
