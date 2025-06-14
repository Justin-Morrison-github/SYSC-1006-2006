import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
import { AlertIcon, InfoIcon, SearchIcon } from '@primer/octicons-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';

// Custom Components
import Quiz from './Quiz';
import JQuiz from './JQuiz';
import VJQuiz from './VJQuiz';
import VQuiz from './VQuiz';
import DropQuiz from './DropQuiz';
import FillInTheBlank from './FillInTheBlank';
import CCodeRunner from "./CCodeRunner";
import Exercise from "./Exercise"
import CodeBox from "./CodeBox"
import PopUp from './PopUp';
import Gradeable from './Gradeable';
import Footer from './Footer';
// import CheckQuiz from './CheckQuiz';

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
export const CodeBlock = ({ node, inline, className, children, ...props }) => {
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

export const COLORS = {
    definition: '#fa73ce',
    warning: '#eab308',
    info: '#3b82f6',
    error: '#ef4444',
    orange: "#f97316",
    exercise: "#0ea5e9",
};

export default function MarkdownRenderer({ content, slugs, children }) {
    return (
        <div className="prose prose-invert markdown-body w-full max-w-none p-4 pb-6">
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    code: CodeBlock,
                    blockquote: ({ children }) => (
                        <div className="bg-zinc-800 border-l-4 border-yellow-500 p-4 rounded-md my-4 font-semibold text-blue-100">
                            {children}
                        </div>
                    ),
                    strong: ({ children, color = "#3b82f6" }) => (
                        <strong className="font-bold" style={{ color: color }}>{children}</strong>
                    ),
                    // em: ({ children }) => (
                    //     <strong className="text-blue-400 font-bold">{children}</strong>
                    // ),
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
                    jquiz: ({ node, ...props }) => (
                        <JQuiz {...props} slugs={slugs}></JQuiz>
                    ),
                    vjquiz: ({ node, ...props }) => (
                        <VJQuiz {...props} slugs={slugs}></VJQuiz>
                    ),
                    gradeable: ({ children, ...props }) => (
                        <Gradeable {...props}>{children}</Gradeable>
                    ),
                    vquiz: ({ children, ...props }) => (
                        <VQuiz {...props}>{children}</VQuiz>
                    ),
                    codebox: ({ children, ...props }) => {
                        return (
                            <CodeBox {...props} color={COLORS.exercise}>
                                {children}
                            </CodeBox>
                        )
                    },
                    // checkquiz: ({ children, ...props }) => (
                    //     <CheckQuiz {...props} slugs={slugs}></CheckQuiz>
                    // ),
                    footer: ({ link, children, ...props }) => (
                        <Footer link={link} {...props}>{children}</Footer>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
            {children}
        </div>
    )
}