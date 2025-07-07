import { useState } from 'react';
import CodeBox from './CodeBox';
import { COLORS } from './MarkdownRenderer'
import { useJSONLoad } from './JsonUtils';
import Hint from './Hint';

function indexToLetter(index) {
    if (index < 0 || index > 25) {
        throw new Error("Index must be between 0 and 25.");
    }
    return String.fromCharCode('A'.charCodeAt(0) + index);
}

export default function VJQuiz({ question, onAnswerChange, slugs, exercisenumber, showletters = true, formattitle = false }) {
    const loadQuestion = useJSONLoad({ slugs, exercisenumber, question });

    const [selected, setSelected] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);
    const [animateClass, setAnimateClass] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const handleClick = (opt) => {
        let newSelected = opt === selected ? null : opt;
        setSelected(newSelected);

        const newCorrect = newSelected === loadQuestion?.parsedQuestion?.answer
        setIsCorrect(newCorrect)

        // Notify parent about correctness change
        if (onAnswerChange) {
            onAnswerChange(newCorrect);
        }
        if (!newCorrect && newSelected !== null) {
            setAnimationKey((k) => k + 1); // bump key to remount animation div
        }

        if (newSelected === null) {
            setAnimateClass('');
            return
        }

        const className = newCorrect ? 'bg-correct-gradient' : 'bg-error-gradient';
        setAnimateClass(className);

        // Remove class after animation to prevent replay on re-show
        if (className !== "bg-correct-sweep" && className !== "bg-correct-gradient") {
            const timeout = setTimeout(() => setAnimateClass(''), 600);
            return () => clearTimeout(timeout);
        }
    };

    if (loadQuestion?.parsedQuestion === undefined) {
        return (
            <div className='markdown-body mt-2 px-4 py-2 border border-slate-500 rounded-md'>
                Error: Question {question} Not Found
            </div>
        )
    }

    const OptionButton = ({ opt }) => (
        <button
            key={opt}
            onClick={() => handleClick(opt)}
            className={` px-6 py-2 rounded-r border cursor-pointer w-full h-10 
                ${selected === opt
                    ? `text-black ${opt === loadQuestion?.parsedQuestion?.answer ? 'border-black bg-green-400' : ' border-black bg-red-400'}`
                    : 'border-gray-300 bg-slate-900 text-white'}
                                        `}>
            <div className='flex justify-center items-center relative inline-block'>
                <div>
                    {opt}
                </div>

                {selected === opt && (
                    <div className="absolute left-full top-0 ml-[30px] text-white text-left w-max">
                        {isCorrect ? '✅' : '❌'} {loadQuestion?.parsedQuestion?.options[selected] || "Incorrect"}
                    </div>
                )}
            </div>
        </button>
    )

    const OptionLetter = ({ opt, index }) => {
        return showletters ? (
            <div className={`text-xl w-10 h-10 border rounded-l ${selected === opt
                ? `text-black ${opt === loadQuestion?.parsedQuestion?.answer ? 'border-black bg-green-400' : ' border-black bg-red-400'}`
                : 'border-gray-300 bg-slate-900 text-white'}`}>
                <div className={`text-xl w-10 h-full rounded-l flex justify-center items-center`}>
                    {indexToLetter(index)}
                </div>
            </div>
        ) : null
    }

    const Option = ({ opt, index }) => (
        <div key={opt} className='flex items-center'>
            <OptionLetter opt={opt} index={index} />
            <OptionButton opt={opt} />
        </div>
    )


    return (
        <div className='markdown-body my-4 rounded-md'>
            <div key={animationKey}
                className={`transition-all duration-1000 markdown-body px-4 py-2 border border-slate-500 rounded-md ${animateClass}`}
            >
                <div className='flex gap-4 justify-left items-center pt-2 ml-2 border-b-2  w-max'
                    style={{ borderColor: COLORS.exercise }}>

                    <div className={`text-bold text-2xl`} style={{ color: "white" }}>
                        {formattitle ? `${exercisenumber}.${question}` : `${question}.`}
                    </div>

                    <div className='text-2xl' style={{ color: "white" }}>
                        {loadQuestion?.parsedQuestion?.question}
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-max p-2' >
                    {loadQuestion?.parsedQuestion?.code &&
                        <CodeBox language='c' copy="false">
                            {loadQuestion?.parsedQuestion?.code}
                        </CodeBox>
                    }

                    <div className={`flex flex-col gap-3 w-max ${loadQuestion?.parsedQuestion?.code ? "" : "mt-2"}`} key={animationKey}>
                        {
                            loadQuestion?.parsedQuestion &&
                            Object.entries(loadQuestion?.parsedQuestion?.options).map(([opt, _], index) => (
                                <Option opt={opt} index={index} key={index} />
                            ))
                        }

                        <Hint type={"vjquiz"} hint={loadQuestion?.parsedQuestion?.hint} />
                    </div>
                </div>
            </div>
        </div>
    );
}
