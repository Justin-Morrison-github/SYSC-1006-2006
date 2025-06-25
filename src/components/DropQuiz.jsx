import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import VJQuiz from './VJQuiz';
import MultiQuiz from './MultiQuiz';
import JQuiz from './JQuiz';


export default function DropQuiz({ type, question, title, onAnswerChange, slugs, exercisenumber }) {

    const [collapsed, setCollapsed] = useState(true);


    const [__, subType] = type ? type.split("-") : [null, null]
    let quiz = null;

    if (subType === "vertical") {
        quiz = <VJQuiz question={question} onAnswerChange={onAnswerChange} slugs={slugs} exercisenumber={exercisenumber} />
    }
    else if (subType === "horizontal") {
        quiz = <JQuiz question={question} onAnswerChange={onAnswerChange} slugs={slugs} exercisenumber={exercisenumber} />
    }
    else if (subType === "multiselect") {
        quiz = <MultiQuiz question={question} onAnswerChange={onAnswerChange} slugs={slugs} exercisenumber={exercisenumber} />
    }


    return (
        <div className='markdown-body mt-2 rounded-md'>
            <button onClick={() => setCollapsed((prev) => !prev)}>
                <div className='flex items-center mx-1 gap-2'>
                    {
                        collapsed ? <ChevronDown className="w-8 h-8 mt-1" /> : <ChevronUp className="w-8 h-8 mt-1" />
                    }

                    <div className='text-xl'>
                        {`${exercisenumber}.${question}` ?? "Quiz Question"}
                    </div>
                </div>
            </button>
            {
                <div className={`px-2 ${collapsed ? "hidden" : "block"}`}>
                    {quiz}
                </div>

            }
        </div>
    );
}
