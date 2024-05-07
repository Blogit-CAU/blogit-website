'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const TextItem = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function TextEditor() {
  const [text, setText] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('TEXT_KEY') || ''
      : '입력없음',
  );

  return (
    <TextItem
      theme='snow'
      value={text}
      onChange={setText}
      style={{ height: '500px' }}
    />
  );
}
