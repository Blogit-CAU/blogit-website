'use client';

import React, { useEffect, useState } from 'react';
//import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

import { generatePost } from '@/api/openai';
import { useCommitStore } from '@/store';
import { Headline_00 } from './Typography';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/post';

import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic<MDEditorProps>(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

/*
const TextItem = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
*/
export default function TextEditor() {
  const router = useRouter();
  const commitStore = useCommitStore();
  const postStore = usePostStore();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (value: any) => {
    setText(value);
  };

  useEffect(() => {
    async function init() {
      const stream = await generatePost(JSON.stringify(commitStore.commits)); // responseData는 스트리밍된 데이터입니다.

      let newText = '';
      setLoading(true);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        // 새로운 텍스트를 설정하고 공백을 제거합니다.
        newText += content;
      }

      // 새로운 텍스트를 설정합니다.
      setText(newText);
      setLoading(false);
    }
    if (commitStore.commits.length > 0) {
      init();
    }
  }, [commitStore.commits.length]);

  const handleSubmit = () => {
    postStore.add(text);
    router.push('/post/share');
  };

  return (
    <>
      {loading && (
        <div className='flex items-center mb-4'>
          <div className='flex justify-center items-center mr-4'>
            <div className='border border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin'></div>
          </div>
          <Headline_00>GPT가 글을 작성중입니다...</Headline_00>
        </div>
      )}
      {/*<TextItem
        theme='snow'
        value={text}
        onChange={setText}
        style={{ height: '500px' }}
    />*/}
      <MDEditor
        style={{ height: '500px' }}
        value={text}
        onChange={handleChange}
      />

      <Button
        size='L'
        backgroundColor='#74AA9C'
        className='h-10 mt-20'
        onClick={handleSubmit}
        disabled={loading}
      >
        {'확인'}
      </Button>
    </>
  );
}
