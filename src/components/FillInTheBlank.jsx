import React, { useState, useRef } from 'react';

export default function FillInTheBlank({ question = '', answer = '', cased = "true", hint = "", onAnswerChange, children }) {
    const [input, setInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [errorAnimationKey, setErrorAnimationKey] = useState(0);
    const inputRef = useRef(null);


    function handleKeyDown(event) {
        if (event.key === 'Enter') {

            const correct = cased === "true" ?
                (input.trim() === answer) :
                (input.trim().toLowerCase() === answer.toLowerCase())
            setIsCorrect(correct);
            setSubmitted(true);

            if (!correct) {
                setErrorAnimationKey((k) => k + 1); // bump key to remount animation div
            }

            if (onAnswerChange) {
                onAnswerChange(correct);
            }

            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }

    const [giveHint, setGiveHint] = useState(false);

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }


    return (
        <div key={errorAnimationKey} className={`transition-all duration-1000 markdown-body mt-2 px-4 py-2 border border-slate-500 rounded-md 
            ${submitted
                ? isCorrect
                    ? 'bg-correct-sweep'
                    : 'bg-error-gradient'
                : ''
            }`}>

            <p className='font-semibold'>{question}</p>
            {children}
            <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    setSubmitted(false); // reset feedback on input change
                    onAnswerChange(false)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer and press Enter"
                className='p-2 w-64 rounded-md bg-zinc-800'
            />
            {/* {submitted && (
                <div className="mt-4">
                    {isCorrect ? '✅ Correct!' : 'Incorrect, try again.'}
                </div>
            )} */}

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
