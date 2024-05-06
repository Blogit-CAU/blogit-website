'use client';

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

const TextItem = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
    
})

export default function TextEditor(){

    const [ text, setText ] = useState('');
    
    return (
        <div>
            <TextItem 
            theme="snow"
            value={text}
            onChange={ setText }
            />
            {text}
        </div>
    )
};