import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
SyntaxHighlighter.registerLanguage('c', c);
import { Check, Clipboard } from 'lucide-react';

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
export default function CodeBox({ language, children, copy = "true" }) {
    const cleanedChildren = children?.replace(/^\n/, '');


    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(children).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 1 sec
        });
    };
    return (
        <div className="relative">
            {
                copy === "true" && (
                    <button className='absolute right-[10px] top-[12px] px-2 py-1 rounded cursor-pointer  transition-colors duration-300 ease-in-out bg-transparent'
                        onClick={handleCopy}
                    >
                        <div className='text-white text-xs flex gap-1 items-center'>

                            {/* <Clipboard size={16} /> */}
                            {copied ? <Check size={16} /> : <Clipboard size={16} />}

                            {copied ? 'Copied' : 'Copy'}
                        </div>
                    </button>
                )
            }

            <SyntaxHighlighter language={language} style={customStyle} wrapLines >
                {cleanedChildren}
            </SyntaxHighlighter>
        </div>
    );
}