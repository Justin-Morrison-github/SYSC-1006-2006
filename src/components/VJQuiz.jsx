import React, { useState, useEffect, Children } from 'react';
import CodeBox from './CodeBox';


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


export default function VJQuiz({ question, onAnswerChange, slugs }) {
    const [selected, setSelected] = useState(null);
    const [parsedQuestion, setParsedQuestion] = useState(null);
    const [giveHint, setGiveHint] = useState(false);
    const isCorrect = selected !== null && selected === parsedQuestion?.answer;
    const [animationKey, setAnimationKey] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);

    useEffect(() => {
        // Load JSON only once or when lecture/file/question change
        loadJson(slugs?.lecture, slugs?.topic).then(data => {
            const q = data[question];
            console.log('VJQuiz Loaded question:', q);
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
            {/* <div className="markdown-body px-4 pt-2 border border-slate-500 rounded-md"> */}
            <div key={animationKey} className={`transition-all duration-1000 markdown-body px-4 py-2 border border-slate-500 rounded-md 
                 ${hasAnswered && selected
                    ? isCorrect
                        ? 'bg-correct-sweep'
                        : 'bg-error-gradient'
                    : ''
                }`}>
                <div className='flex gap-4 items-center font-semibold py-2 mb-2'>
                    <div className='text-bold text-xl underline'>
                        {parsedQuestion?.title}
                    </div>
                    {parsedQuestion?.question}
                </div>

                <CodeBox language='c'>
                    {parsedQuestion?.code}
                </CodeBox>

                <div key={animationKey}
                // className={`w-[1336px] relative left-[-16px] pt-4 border-t rounded-b-md 
                //     ${hasAnswered && selected
                //         ? isCorrect
                //             ? 'bg-correct-sweep'
                //             : 'bg-error-gradient'
                //         : ''
                //     }
                // `}
                >
                    <div className="flex flex-col gap-3 w-24 ">
                        {/* <div className=" gap-3 w-24 grid grid-cols-[100px_100px] "> */}

                        {parsedQuestion &&
                            Object.entries(parsedQuestion.options).map(([opt, _]) => {
                                const isSelected = selected === opt;

                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleClick(opt)}
                                        className={`
                                        px-4 py-2 rounded border cursor-pointer
                                        ${isSelected
                                                ? `text-black ${opt === parsedQuestion?.answer ? 'border-green-500 bg-green-400' : 'border-red-500 bg-red-400'}`
                                                : 'border-gray-300 bg-slate-900 text-white'}
                                      `}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                    </div>



                    <div className="text-yellow-700 py-2 mb-1 flex gap-4 ">
                        {
                            parsedQuestion && parsedQuestion?.hint && (
                                <button className='text-white/80 text-left rounded hover:bg-slate-800 h-full'
                                    onClick={handleHintClick}
                                >
                                    {giveHint ? "Hide Hint" : "Show Hint"}
                                </button>
                            )
                        }
                        {
                            giveHint && (
                                <div className='text-yellow-400'>{parsedQuestion?.hint}</div>
                            )
                        }
                    </div>

                    {selected !== null && (
                        <div className=" py-2">
                            {isCorrect ? '✅' : '❌'} {parsedQuestion?.options[selected] || "Incorrect"}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
