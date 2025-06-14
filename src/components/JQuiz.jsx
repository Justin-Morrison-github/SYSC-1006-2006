import React, { useState, useEffect } from 'react';
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


export default function JQuiz({ question, onAnswerChange, slugs, exercisenumber }) {
    const [selected, setSelected] = useState(null);
    const [parsedQuestion, setParsedQuestion] = useState(null);
    const [giveHint, setGiveHint] = useState(false);
    const isCorrect = selected !== null && selected === parsedQuestion?.answer;
    const [errorAnimationKey, setErrorAnimationKey] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);


    useEffect(() => {
        // Load JSON only once or when lecture/file/question change
        loadJson(slugs?.lecture, slugs?.topic).then(data => {
            const q = data[exercisenumber][question];
            console.log('Loaded question:', q);
            setParsedQuestion(q);

        });
    }, [question, exercisenumber]); // re-run if these change

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }

    const handleClick = (opt) => {
        let newSelected = opt === selected ? null : opt;
        setSelected(newSelected);
        setHasAnswered(true);

        if (!isCorrect) {
            setErrorAnimationKey((k) => k + 1); // bump key to remount animation div
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
        <div className='markdown-body mt-2 rounded-md'>
            {/* <div className="markdown-body px-4 py-2 border border-slate-500 rounded-md"> */}
            <div key={errorAnimationKey} className={`transition-all duration-1000 markdown-body px-4 py-2 border border-slate-500 rounded-md 
                 ${hasAnswered && selected
                    ? isCorrect
                        ? 'bg-correct-gradient'
                        : 'bg-error-gradient'
                    : ''
                }`}>
                <div className='flex gap-4 items-center font-semibold py-2 mb-2'>
                    <div className='text-bold text-xl underline'>
                        {/* {parsedQuestion?.title} */}
                        {exercisenumber}.{question}
                    </div>
                    {parsedQuestion?.question}
                </div>

                <CodeBox language='c'>
                    {parsedQuestion?.code}
                </CodeBox>

                <div className="flex flex-wrap gap-3">
                    {parsedQuestion &&
                        Object.entries(parsedQuestion.options).map(([opt, _]) => {
                            const isSelected = selected === opt;

                            return (
                                <button
                                    key={opt}
                                    onClick={() => handleClick(opt)}
                                    className={`
                                        px-4 py-2 rounded border 
                                        ${isSelected
                                            ? `text-black ${opt === parsedQuestion?.answer ? 'border-green-500 bg-green-400' : 'border-red-500 bg-red-400'}`
                                            : 'border-gray-300 bg-slate-900 text-white'}
                                        cursor-pointer
                                      `}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                </div>

                <div className="text-yellow-700 py-2 mb-1 flex gap-4">
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
                    <div className="py-2 mt-1">
                        {isCorrect ? '✅' : '❌'} {parsedQuestion?.options[selected] || "Incorrect"}
                    </div>
                )}
            </div>

        </div>
    );
}
