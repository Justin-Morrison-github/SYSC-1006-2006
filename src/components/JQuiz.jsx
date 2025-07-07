import { useState } from 'react';
import CodeBox from './CodeBox';
import { useJSONLoad } from './JsonUtils';
import Hint from './Hint';



export default function JQuiz({ question, onAnswerChange, slugs, exercisenumber }) {
    const loadQuestion = useJSONLoad({ slugs, exercisenumber, question });

    const [selected, setSelected] = useState(null);
    const isCorrect = selected !== null && selected === loadQuestion?.parsedQuestion?.answer;
    const [errorAnimationKey, setErrorAnimationKey] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);

    const OptionButton = ({ opt }) => (
        <button
            key={opt}
            onClick={() => handleClick(opt)}
            className={`
            px-4 py-2 rounded border 
            ${selected === opt
                    ? `text-black ${opt === loadQuestion?.parsedQuestion?.answer ? 'border-green-500 bg-green-400' : 'border-red-500 bg-red-400'}`
                    : 'border-gray-300 bg-slate-900 text-white'}
            cursor-pointer
          `}
        >
            {opt}
        </button>
    )


    const handleClick = (opt) => {
        let newSelected = opt === selected ? null : opt;
        setSelected(newSelected);
        setHasAnswered(true);

        if (!isCorrect) {
            setErrorAnimationKey((k) => k + 1); // bump key to remount animation div
        }

        // Notify parent about correctness change
        if (onAnswerChange) {
            onAnswerChange(newSelected === loadQuestion?.parsedQuestion?.answer);
        }
    };

    if (loadQuestion?.parsedQuestion === undefined) {
        return (
            <div className='markdown-body rounded-md mt-2 px-4 py-2 border border-slate-500'>
                Question {question} Not Found
            </div>
        )
    }

    return (
        <div className='markdown-body mt-2 rounded-md'>
            <div key={errorAnimationKey} className={`transition-all duration-1000 px-4 py-2 border border-slate-500 rounded-md 
                 ${hasAnswered && selected
                    ? isCorrect
                        ? 'bg-correct-gradient'
                        : 'bg-error-gradient'
                    : ''
                }`}>
                <div className='flex gap-4 items-center font-semibold py-2 mb-2'>
                    <div className='text-bold text-xl underline'>
                        {/* {loadQuestion?.parsedQuestion?.title} */}
                        {exercisenumber}.{question}
                    </div>
                    {loadQuestion?.parsedQuestion?.question}
                </div>

                <CodeBox language='c'>
                    {loadQuestion?.parsedQuestion?.code}
                </CodeBox>

                <div className="flex flex-wrap gap-3">
                    {loadQuestion?.parsedQuestion &&
                        Object.entries(loadQuestion?.parsedQuestion.options).map(([opt, _]) => {
                            return (
                                <OptionButton opt={opt} key={opt} />
                            );
                        })}
                </div>

                <Hint type={"jquiz"} hint={loadQuestion?.parsedQuestion?.hint} />

                {selected !== null && (
                    <div className="py-2 mt-1">
                        {isCorrect ? '✅' : '❌'} {loadQuestion?.parsedQuestion?.options[selected] || "Incorrect"}
                    </div>
                )}
            </div>
        </div>
    );
}
