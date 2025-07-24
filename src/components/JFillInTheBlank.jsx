import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from './MarkdownRenderer';
import CodeBox from './CodeBox';
import { useJSONLoad } from './JsonUtils';
import Hint from './Hint';
import { JLoadedTitle } from './Components';



export default function JFillInTheBlank({ question, slugs, exercisenumber, cased = "true", onAnswerChange, children, formattitle }) {
    const loadQuestion = useJSONLoad({ slugs, exercisenumber, question });

    const [input, setInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const inputRef = useRef(null);
    const [animationKey, setAnimationKey] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [animateClass, setAnimateClass] = useState('');

    useEffect(() => {
        if (hasAnswered) {
            const className = isCorrect ? 'bg-correct-gradient' : 'bg-error-gradient';
            setAnimateClass(className);

            // Remove class after animation to prevent replay on re-show
            if (className !== "bg-correct-sweep" && className !== "bg-correct-gradient") {
                const timeout = setTimeout(() => setAnimateClass(''), 600);
                return () => clearTimeout(timeout);
            }
        }
    }, [hasAnswered]);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            setHasAnswered(true);

            const correct = cased === "true" ?
                (input.trim() === loadQuestion?.parsedQuestion?.answer) :
                (input.trim().toLowerCase() === loadQuestion?.parsedQuestion?.answer.toLowerCase())
            setIsCorrect(correct);

            if (!correct) {
                setAnimationKey((k) => k + 1); // bump key to remount animation div
            }

            // Notify parent about correctness change
            if (onAnswerChange) {
                onAnswerChange(correct);
            }
            if (!correct) {
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 0);
            }

            setTimeout(() => {
                setHasAnswered(false);
            }, 400);
        }
    }

    return (
        <div className='markdown-body my-4 rounded-md'>
            <div key={animationKey}
                className={`transition-all duration-1000 markdown-body px-4 py-2 border border-slate-500 rounded-md ${animateClass}`}
            >
                <JLoadedTitle
                    formattitle={formattitle}
                    exerciseNum={exercisenumber}
                    question={loadQuestion?.parsedQuestion?.question}
                    questionNum={question}
                />

                <div className='flex flex-col gap-2 p-2' >
                    {loadQuestion?.parsedQuestion?.code &&
                        <CodeBox language='c'>
                            {loadQuestion?.parsedQuestion?.code}
                        </CodeBox>
                    }
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            onAnswerChange(false)
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your answer and press Enter"
                        className={`w-64 markdown-body px-2 py-2 border border-slate-500 rounded-md`}
                        disabled={isCorrect}
                    />
                    {loadQuestion?.parsedQuestion?.hint && (
                        <div className={`${loadQuestion?.parsedQuestion?.code ? "" : "mt-2"}`}>
                            <Hint type={"fillblank"} hint={loadQuestion?.parsedQuestion?.hint} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
