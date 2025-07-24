import { useState, useEffect } from 'react';
import CodeBox from './CodeBox';
import { COLORS } from './MarkdownRenderer'
import { Circle, Check, X } from "lucide-react";
import { useJSONLoad } from './JsonUtils';
import Hint from './Hint';
import { JLoadedTitle } from './Components';

function arraysEqual(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}


export default function MultiQuiz({ question, onAnswerChange, slugs, exercisenumber, formattitle }) {
    const [selected, setSelected] = useState([]);
    const loadQuestion = useJSONLoad({ slugs, exercisenumber, question });
    const isCorrect = selected !== null && selected === loadQuestion.parsedQuestion?.answer;
    const [animationKey, setAnimationKey] = useState(0);
    const [animateClass, setAnimateClass] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleClick = (selectedIndex) => {
        setSelected((prev) =>
            prev.includes(selectedIndex)
                ? prev.filter((item) => item !== selectedIndex)
                : [...prev, selectedIndex]
        );

        if (!isCorrect) {
            setAnimationKey((k) => k + 1); // bump key to remount animation div
        }
    };

    const handleSubmit = () => {
        // Notify parent about correctness change
        const newCorrect = arraysEqual(selected, loadQuestion.parsedQuestion?.answer);

        if (onAnswerChange) {
            onAnswerChange(newCorrect);
        }

        if (submitted) {
            setSelected([])
            if (onAnswerChange) {
                onAnswerChange(false)
            }
        }

        setSubmitted(!submitted)

        const className = newCorrect ? 'bg-correct-gradient' : 'bg-error-gradient';
        setAnimateClass(className);

        // Remove class after animation to prevent replay on re-show
        if (className !== "bg-correct-sweep" && className !== "bg-correct-gradient") {
            const timeout = setTimeout(() => setAnimateClass(''), 600);
            return () => clearTimeout(timeout);
        }
    }

    if (loadQuestion.parsedQuestion === undefined) {
        return (
            <div className='markdown-body rounded-md mt-2 px-4 py-2 border border-slate-500 rounded-md'>
                Question {question} Not Found
            </div>
        )
    }

    return (
        <div className='markdown-body my-4 rounded-md'>
            <div key={animationKey}
                className={`transition-all duration-1000 px-4 py-2 border border-slate-500 rounded-md 
                    ${animateClass}`}
            >
                <JLoadedTitle
                    formattitle={formattitle}
                    exerciseNum={exercisenumber}
                    question={loadQuestion?.parsedQuestion?.question}
                    questionNum={question}
                />

                <div className='flex flex-col gap-2 p-2 mt-2' >
                    {
                        loadQuestion.parsedQuestion?.code && (
                            <div className='my-1'>
                                <CodeBox language='c' className>
                                    {loadQuestion.parsedQuestion?.code}
                                </CodeBox>
                            </div>
                        )
                    }

                    <div className="flex flex-col gap-3 w-max" key={animationKey}>
                        {loadQuestion.parsedQuestion &&
                            loadQuestion.parsedQuestion?.options.map((opt, index) => {
                                return (
                                    <div key={index} className='flex gap-4 '>
                                        <button className="relative w-10 h-10 flex items-center justify-center" disabled={submitted}
                                        >
                                            <Circle
                                                size={32}
                                                className="text-gray-700"
                                                fill={submitted ? "transparent" : selected.includes(index) ? "gray" : "transparent"}
                                                onClick={() => handleClick(index)}
                                            />
                                            {submitted && (
                                                loadQuestion.parsedQuestion?.answer.includes(index) && selected.includes(index) || !loadQuestion.parsedQuestion?.answer.includes(index) && !selected.includes(index) ? (
                                                    <Check size={20} className="absolute text-green-500" />
                                                ) : (
                                                    <X size={20} className="absolute text-red-500" />
                                                )
                                            )}
                                        </button>

                                        <button
                                            disabled={submitted}
                                            onClick={() => handleClick(index)}
                                            className={`px-4 py-2 rounded border cursor-pointer w-full
                                            ${submitted ? loadQuestion.parsedQuestion?.answer.includes(index) && selected.includes(index) || !loadQuestion.parsedQuestion?.answer.includes(index) && !selected.includes(index) ? "text-black border-green-500 bg-green-400" : "text-black border-red-500 bg-red-400" : selected.includes(index) ? "bg-[#113e6c]" : "border-gray-300 bg-slate-900 text-white"}
                                            `}
                                        >
                                            <div className='flex justify-start items-center relative inline-block'>
                                                {opt}

                                                {selected === opt && (
                                                    <div className="absolute left-full top-0 ml-[30px] text-white text-left w-max">
                                                        {isCorrect ? '✅' : '❌'} {loadQuestion.parsedQuestion?.options[selected] || "Incorrect"}
                                                    </div>
                                                )}
                                            </div>

                                        </button>
                                    </div>
                                );
                            })}
                        <div className="relative w-full">
                            {
                                loadQuestion.parsedQuestion && (
                                    <button className='text-white/80 text-left w-full text-center hover:bg-slate-800 rounded bg-slate-700 text-white border p-2 h-full'
                                        onClick={handleSubmit}
                                    >
                                        {submitted ? "Reset" : "Submit"}
                                    </button>
                                )
                            }
                        </div>

                        <Hint type={"multiquiz"} hint={loadQuestion?.parsedQuestion?.hint} />
                    </div>

                </div>
            </div>
        </div >
    );
}
