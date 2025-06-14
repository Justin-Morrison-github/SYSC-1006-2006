import { useState } from 'react';

function parseOptions(str) {
    try {
        const fixed = str
            // Quote unquoted keys (including those like True, False, with spaces, etc.)
            .replace(/([{,]\s*)([a-zA-Z0-9_ ]+)\s*:/g, '$1"$2":')
            // Replace single quotes with double quotes
            .replace(/'/g, '"');

        return JSON.parse(fixed);
    } catch (e) {
        console.error("Invalid JSON after transformation:", str);
        return {};
    }
}


export default function Quiz({ question, options, correct, children, title, hint, onAnswerChange }) {
    const [selected, setSelected] = useState(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const isCorrect = selected !== null && selected === correct;
    const parsedOptions = typeof options === 'string' ? parseOptions(options) : options;
    const [errorAnimationKey, setErrorAnimationKey] = useState(0);


    const handleClick = (opt) => {
        let newSelected = opt === selected ? null : opt;
        setSelected(newSelected);
        setHasAnswered(true);

        if (!isCorrect) {
            setErrorAnimationKey((k) => k + 1); // bump key to remount animation div
        }

        // Notify parent about correctness change
        if (onAnswerChange) {
            onAnswerChange(newSelected === correct);
        }
    };

    const [giveHint, setGiveHint] = useState(false);

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }


    if (typeof options === 'string') {
        const jsonLike = options
            .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // quote keys
            .replace(/'/g, '"');                      // replace single with double quotes
        try {
            options = JSON.parse(jsonLike);
        } catch (e) {
            console.error("Invalid JSON after transformation:", jsonLike);
        }
    } else {
        console.error("Expected a string, got:", typeof options);
        console.log(options)
    }


    return (
        <div className='markdown-body mt-2 rounded-md'>
            <div key={errorAnimationKey} className={`transition-all duration-1000 markdown-body px-4 py-2 border border-slate-500 rounded-md 
                 ${hasAnswered && selected
                    ? isCorrect
                        ? 'bg-correct-sweep'
                        : 'bg-error-gradient'
                    : ''
                }`}>
                <div className='flex gap-4 items-center font-semibold py-2 mb-2 '>
                    <div className='text-bold text-xl underline'>
                        {title}
                    </div>
                    {question}
                </div>

                {children && <div className="quiz-preface">{children}</div>}

                <div className="flex flex-wrap gap-3">
                    {Object.entries(parsedOptions).map(([opt, explanation]) => {
                        const isSelected = selected === opt;

                        return (
                            <button
                                key={opt}
                                onClick={() => handleClick(opt)}
                                className={`
                                px-4 py-2 rounded border 
                                ${isSelected
                                        ? `text-black ${opt === correct ? 'border-green-500 bg-green-400' : 'border-red-500 bg-red-400'}`
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

                {selected !== null && (
                    <div className="py-2 mt-1">
                        {isCorrect ? '✅' : '❌'} {options[selected] || "Incorrect"}
                    </div>
                )}
            </div>
        </div>
    );
}
