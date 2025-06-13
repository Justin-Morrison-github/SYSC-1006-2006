import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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


export default function VQuiz({ lecture, file, question, children, onAnswerChange }) {
    const [selected, setSelected] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [parsedQuestion, setParsedQuestion] = useState(null);
    const [giveHint, setGiveHint] = useState(false);

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }

    // Convert question prop to zero-based index
    const questionNum = Number(question) - 1;

    useEffect(() => {
        // Load JSON only once or when lecture/file/question change
        loadJson(lecture, file).then(data => {
            if (data && Array.isArray(data) && questionNum >= 0 && questionNum < data.length) {
                const q = data[questionNum];
                console.log('Loaded question:', q);
                setParsedQuestion(q);
            } else {
                console.warn('Question number out of range or invalid data');
                setParsedQuestion(null);
            }
        });
    }, [lecture, file, questionNum]); // re-run if these change

    useEffect(() => {
        if (!parsedQuestion) return; // Guard: don't run if null

        const { correct, title, question, options, hint, code } = parsedQuestion;
        setCorrect(correct)
    }, [parsedQuestion]);

    const isCorrect = selected !== null && selected === correct;


    const handleClick = (opt) => {
        let newSelected = opt === selected ? null : opt;
        setSelected(newSelected);

        // Notify parent about correctness change
        if (onAnswerChange) {
            onAnswerChange(newSelected === correct);
        }
    };

    return (
        <div className='markdown-body mt-2'>
            <div className="markdown-body px-4 py-2 border border-slate-500 rounded-md">
                <div className='flex gap-4 items-center font-semibold py-2 mb-2'>
                    <div className='text-bold text-xl underline'>
                        {parsedQuestion?.title}
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
                                            ? `text-black ${opt === correct ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'}`
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
