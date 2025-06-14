import React, { useState, useEffect, Children } from 'react';
import CodeBox from './CodeBox';
import { COLORS } from './MarkdownRenderer'

async function loadJson(lecture, file) {
    try {
        const response = await fetch(`/content/lectures/${lecture}/${file}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JS object
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
        return null;
    }
}


export default function VJQuiz({ question, onAnswerChange, slugs, exercisenumber }) {
    const [selected, setSelected] = useState(null);
    const [parsedQuestion, setParsedQuestion] = useState(null);
    const [giveHint, setGiveHint] = useState(false);
    const isCorrect = selected !== null && selected === parsedQuestion?.answer;
    const [animationKey, setAnimationKey] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [animateClass, setAnimateClass] = useState('');

    useEffect(() => {
        if (hasAnswered && selected) {
            const className = isCorrect ? 'bg-correct-sweep' : 'bg-error-gradient';
            setAnimateClass(className);

            // Remove class after animation to prevent replay on re-show
            if (className !== "bg-correct-sweep" && className !== "bg-correct-gradient") {
                const timeout = setTimeout(() => setAnimateClass(''), 600);
                return () => clearTimeout(timeout);
            }
        }
    }, [hasAnswered, selected]);


    useEffect(() => {
        // Load JSON only once or when lecture/file/question change
        loadJson(slugs?.lecture, slugs?.topic).then(data => {
            const q = data[exercisenumber][question];
            setParsedQuestion(q);

        });
    }, [question]); // re-run if these change

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }

    const handleClick = (opt) => {
        let newSelected = opt === selected ? null : opt;
        setSelected(newSelected);
        setHasAnswered(true);

        if (!isCorrect) {
            setAnimationKey((k) => k + 1); // bump key to remount animation div
        }

        // Notify parent about correctness change
        if (onAnswerChange) {
            onAnswerChange(newSelected === parsedQuestion?.answer);
        }
    };

    if (parsedQuestion === undefined) {
        return (
            <div className='markdown-body rounded-md mt-2'>
                <div className="markdown-body px-4 py-2 border border-slate-500 rounded-md">
                    <div>
                        Question {question} Not Found
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='markdown-body my-4 rounded-md'>
            <div key={animationKey}
                className={`transition-all duration-1000 markdown-body px-4 py-2 border border-slate-500 rounded-md ${animateClass}`}
            >
                <div className='flex gap-2 justify-left items-center pt-2 ml-2 border-b w-max'
                    style={{ borderColor: COLORS.exercise }}>

                    <div className={`text-bold text-2xl`} style={{ color: "white" }}>
                        {exercisenumber}.{question}
                    </div>

                    <div className='text-2xl' style={{ color: "white" }}>
                        {parsedQuestion?.question}
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-max p-2' >

                    <CodeBox language='c' copy="false">
                        {parsedQuestion?.code}
                    </CodeBox>

                    <div className="flex flex-col gap-3 w-max" key={animationKey}>
                        {parsedQuestion &&
                            Object.entries(parsedQuestion?.options).map(([opt, _]) => {
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleClick(opt)}
                                        className={`
                                        px-6 py-2 rounded border cursor-pointer w-full
                                        ${selected === opt
                                                ? `text-black ${opt === parsedQuestion?.answer ? 'border-green-500 bg-green-400' : 'border-red-500 bg-red-400'}`
                                                : 'border-gray-300 bg-slate-900 text-white'}
                                      `}
                                    >
                                        <div className='flex justify-center items-center relative inline-block'>
                                            <div>

                                                {opt}
                                            </div>

                                            {selected === opt && (
                                                <div className="absolute left-full top-0 ml-[30px] text-white text-left w-max">
                                                    {isCorrect ? '✅' : '❌'} {parsedQuestion?.options[selected] || "Incorrect"}
                                                </div>
                                            )}
                                        </div>

                                    </button>
                                );
                            })}
                        <div className=" relative inline-block w-full">
                            {
                                parsedQuestion && parsedQuestion?.hint && (
                                    <button className='text-white/80 text-center rounded hover:bg-slate-800 h-full w-full'
                                        onClick={handleHintClick}
                                    >
                                        {giveHint ? "Hide" : "Hint"}
                                    </button>
                                )
                            }
                            {
                                giveHint && (
                                    <div className='absolute left-full top-0 ml-[10px] text-yellow-400 w-max'>{parsedQuestion?.hint}</div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
