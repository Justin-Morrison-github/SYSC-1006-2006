import React, { useState, useEffect } from 'react';

export default function FillInTheBlank({ question = '', answer = '', cased = "true", hint = "", onAnswerChange }) {
    const [input, setInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    function handleKeyDown(event) {
        if (event.key === 'Enter') {

            const correct = cased === "true" ?
                (input.trim() === answer) :
                (input.trim().toLowerCase() === answer.toLowerCase())
            setIsCorrect(correct);
            setSubmitted(true);

            if (onAnswerChange) {
                onAnswerChange(correct);
            }
        }
    }

    const [giveHint, setGiveHint] = useState(false);

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }


    return (
        <div className='markdown-body border mt-2 px-4 pt-4 pb-2  border border-slate-500 rounded-md'>
            <p className='font-semibold'>{question}</p>
            <input
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    setSubmitted(false); // reset feedback on input change
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer and press Enter"
                className='p-2 w-64 rounded-md bg-zinc-800'
            />
            {submitted && (
                <div className="mt-4">
                    {isCorrect ? '✅ Correct!' : 'Incorrect, try again.'}
                </div>
            )}

            <div className="text-yellow-700 pt-4 flex gap-4">
                {
                    hint && (
                        <button className='text-white/80 text-left rounded hover:bg-slate-800 h-full'
                            onClick={handleHintClick}
                        >
                            {giveHint ? "Hide Hint" : "Show Hint"}
                        </button>
                    )
                }
                {
                    giveHint && (
                        <div className='text-yellow-400'>{hint}</div>
                    )
                }
            </div>
        </div>
    );
}
