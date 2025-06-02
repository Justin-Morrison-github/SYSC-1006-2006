import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
SyntaxHighlighter.registerLanguage('c', c);

const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
        ...oneDark['pre[class*="language-"]'],
        backgroundColor: '#151B23',  // bg-gray-800 hex
    },
    'code[class*="language-"]': {
        ...oneDark['code[class*="language-"]'],
        backgroundColor: 'transparent',  // remove background on code tokens
    },
    // Override token styles with backgrounds
    // '.token': {
    //     backgroundColor: 'transparent',
    // }
};
export default function CodeBox({ language, children }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(children).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000); // reset after 1 sec
        });
    };
    return (
        <div className="relative my-4">
            <button className='absolute right-[10px] top-[10px] text-white px-2 py-1 rounded cursor-pointer text-sm'
                onClick={handleCopy}
                style={{
                    background: copied ? '#4caf50' : '#555',
                }}
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <SyntaxHighlighter language={language} style={customStyle} wrapLines
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
}