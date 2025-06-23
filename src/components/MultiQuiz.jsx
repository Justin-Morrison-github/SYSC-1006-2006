import { useState, useEffect } from 'react';
import CodeBox from './CodeBox';
import { COLORS } from './MarkdownRenderer'
import { Circle, Check, X } from "lucide-react";


async function loadLectureJson(lecture, file) {
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

async function loadExerciseJson(exercise) {
    try {
        const response = await fetch(`/content/exercises/${exercise}.json`);
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

function arraysEqual(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}

export default function MultiQuiz({ question, onAnswerChange, slugs, exercisenumber }) {
    const [selected, setSelected] = useState([]);
    const [parsedQuestion, setParsedQuestion] = useState(null);
    const [giveHint, setGiveHint] = useState(false);
    const isCorrect = selected !== null && selected === parsedQuestion?.answer;
    const [animationKey, setAnimationKey] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [animateClass, setAnimateClass] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false)


    useEffect(() => {
        if (slugs?.lecture !== undefined && slugs?.lectureTopic !== undefined) {
            loadLectureJson(slugs?.lecture, slugs?.lectureTopic).then(data => {
                const q = data[exercisenumber][question];
                setParsedQuestion(q);
            });
        }
        else if (slugs?.exercise !== undefined) {
            loadExerciseJson(slugs?.exercise).then(data => {
                const q = data[question];
                setParsedQuestion(q);
            });
        }
    }, [question, slugs]); // re-run if these change

    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }

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
        const newCorrect = arraysEqual(selected, parsedQuestion?.answer);
        setCorrect(newCorrect)

        if (onAnswerChange) {
            console.log(selected);
            console.log(parsedQuestion?.answer);
            console.log(newCorrect);

            onAnswerChange(newCorrect);
        }

        if (submitted) {
            setSelected([])
            if (onAnswerChange) {
                onAnswerChange(false)
            }
            setCorrect(false)
        }

        setSubmitted(!submitted)
    }



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
                className={`transition-all duration-1000  px-4 py-2 border border-slate-500 rounded-md 
                    ${correct ? "bg-correct-gradient" : ""}`}
            >
                <div className='flex gap-2 justify-left items-center pt-2 ml-2 border-b-2 w-max mb-1'
                    style={{ borderColor: COLORS.exercise }}>

                    <div className={`text-bold text-2xl text-white`} >
                        {exercisenumber}.{question}
                    </div>

                    <div className='text-2xl text-white' >
                        {parsedQuestion?.question}
                    </div>
                </div>

                <div className='flex flex-col gap-2 w-max p-2' >
                    {
                        parsedQuestion?.code && (
                            <div className='my-1'>
                                <CodeBox language='c' copy="false" className>
                                    {parsedQuestion?.code}
                                </CodeBox>
                            </div>
                        )
                    }

                    <div className="flex flex-col gap-3 w-max" key={animationKey}>
                        {parsedQuestion &&
                            parsedQuestion?.options.map((opt, index) => {
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
                                                parsedQuestion?.answer.includes(index) && selected.includes(index) || !parsedQuestion?.answer.includes(index) && !selected.includes(index) ? (
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
                                            ${submitted ? parsedQuestion?.answer.includes(index) && selected.includes(index) || !parsedQuestion?.answer.includes(index) && !selected.includes(index) ? "text-black border-green-500 bg-green-400" : "text-black border-red-500 bg-red-400" : selected.includes(index) ? "bg-[#113e6c]" : "border-gray-300 bg-slate-900 text-white"}
                                            `}
                                        >
                                            <div className='flex justify-start items-center relative inline-block'>
                                                {opt}

                                                {selected === opt && (
                                                    <div className="absolute left-full top-0 ml-[30px] text-white text-left w-max">
                                                        {isCorrect ? '✅' : '❌'} {parsedQuestion?.options[selected] || "Incorrect"}
                                                    </div>
                                                )}
                                            </div>

                                        </button>
                                    </div>
                                );
                            })}
                        <div className="relative w-full">
                            {
                                parsedQuestion && (
                                    <button className='text-white/80 text-left w-full text-center hover:bg-slate-800 rounded bg-slate-700 text-white border p-2 h-full'
                                        onClick={handleSubmit}
                                    >
                                        {submitted ? "Reset" : "Submit"}
                                    </button>
                                )
                            }
                        </div>

                        <div className="relative">
                            {
                                parsedQuestion && parsedQuestion?.hint && (
                                    <button className='text-white/80 text-left rounded hover:bg-slate-800 h-full'
                                        onClick={handleHintClick}
                                    >
                                        {giveHint ? "Hide" : "Hint"}
                                    </button>
                                )
                            }
                            {
                                giveHint && (
                                    <div className='absolute left-10 top-0 ml-[10px] text-yellow-400 w-max'>{parsedQuestion?.hint}</div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}
