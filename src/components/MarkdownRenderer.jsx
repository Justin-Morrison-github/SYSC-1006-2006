import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Quiz from './Quiz';
import DropQuiz from './DropQuiz';
import FillInTheBlank from './FillInTheBlank';
import CCodeRunner from "./CCodeRunner"; // adjust the path as needed
import Exercise from "./Exercise"
import CodeBox from "./CodeBox"

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';

import { AlertIcon, InfoIcon, SearchIcon } from '@primer/octicons-react';
import PopUp from './PopUp';

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
// Custom code renderer
const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
        <SyntaxHighlighter style={customStyle} language={match[1]} PreTag="div" {...props}
            customStyle={{ padding: '0px', margin: '0px', borderRadius: '8px' }}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className="bg-gray-800 text-white px-1 py-0.5 rounded text-sm" {...props}>
            {children}
        </code>
    );
};

const COLORS = {
    definition: '#fa73ce',
    warning: '#eab308',
    info: '#3b82f6',
    error: '#ef4444',
    orange: "#f97316",
    exercise: "#0ea5e9",
};

export default function MarkdownRenderer({ content }) {
    return (
        <div className="prose prose-invert markdown-body w-full max-w-none p-4 pb-6">
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code: CodeBlock,
                    // code: ({ node, inline, className, children, ...props }) => {
                    //     const match = /language-(\w+)/.exec(className || '');
                    //     return !inline && match ? (
                    //         <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                    //             {String(children).replace(/\n$/, '')}
                    //         </SyntaxHighlighter>
                    //     ) : (
                    //         <code className="bg-gray-800 text-white px-1 py-0.5 rounded text-sm" {...props}>
                    //             {children}
                    //         </code>
                    //     );
                    // },
                    blockquote: ({ children }) => (
                        <div className="bg-zinc-800 border-l-4 border-yellow-500 p-4 rounded-md my-4 font-semibold text-blue-100">
                            {children}
                        </div>
                    ),
                    strong: ({ children }) => (
                        <strong className="text-blue-400 font-bold">{children}</strong>
                    ),
                    ccoderunner: ({ node, ...props }) => {
                        return <CCodeRunner {...props} />;
                    },
                    quiz: ({ children, ...props }) => (
                        <Quiz {...props}>{children}</Quiz>
                    ),
                    dropquiz: ({ children, ...props }) => (
                        <DropQuiz {...props}>{children}</DropQuiz>
                    ),
                    warning: ({ children, title }) => {
                        return (
                            <PopUp icon={AlertIcon} color={COLORS.warning} title={title || "Warning"}>
                                {children}
                            </PopUp>
                        )
                    },
                    info: ({ children }) => {
                        return (
                            <PopUp icon={InfoIcon} color={COLORS.info} title="Info">
                                {children}
                            </PopUp>
                        )
                    },
                    definition: ({ children, ...props }) => {
                        return (
                            <PopUp icon={SearchIcon} color={COLORS.definition} {...props}>
                                {children}
                            </PopUp>
                        )
                    },
                    title: ({ children }) => {
                        return (
                            <h1>
                                {children}
                                <div className='border-b-4 border-blue-500 pb-1'>

                                </div>
                            </h1>
                        )
                    },
                    fillblank: ({ children, ...props }) => {
                        return (
                            <FillInTheBlank {...props}>
                                {children}
                            </FillInTheBlank>
                        )
                    },
                    exercise: ({ children, ...props }) => {
                        return (
                            <Exercise {...props} color={COLORS.exercise}>
                                {children}
                            </Exercise>
                        )
                    },
                    // codebox: ({ children, ...props }) => {
                    //     return (
                    //         <CodeBox {...props} color={COLORS.exercise}>
                    //             {children}
                    //         </CodeBox>
                    //     )
                    // },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )

}