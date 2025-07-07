import React, { useState, isValidElement } from 'react';
import { QuestionIcon } from '@primer/octicons-react';
import Lottie from "lottie-react";
import checkmarkAnimation from '../assets/animations/checkmark.json'

const pop_up_style1 = "border-l-4 p-4 my-8 bg-zinc-800 rounded-md"
const pop_up_style2 = "border-l-4 p-4 my-8 bg-zinc-900"

export default function Exercise({ children, exercisenumber, dropdown = true, initialCollapsed = false, color, title }) {
    const [collapsed, setCollapsed] = useState(initialCollapsed);
    const [correctMap, setCorrectMap] = useState({});

    const handleAnswerChange = (index, isCorrect) => {
        setCorrectMap(prev => ({
            ...prev,
            [index]: isCorrect,
        }));
    };
    const validChildren = React.Children.toArray(children).filter(isValidElement);
    const childrenWithAnswerChange = validChildren.filter(child =>
        ["quiz", "dropquiz", "jquiz", "vjquiz", "fillblank", "jfillblank", "multiquiz"].includes(child.type.name)
    );

    const totalCount = childrenWithAnswerChange.length;
    const correctCount = Object.values(correctMap).filter(Boolean).length;
    const progressPercent = totalCount === 0 ? 0 : (correctCount / totalCount) * 100;

    return (
        <div className={pop_up_style1} style={{ borderColor: color }}>
            <div className='sticky top-12 h-12 bg-zinc-800 z-[40]' style={{ color: color, fontSize: "x-large" }} >
                <button onClick={() => setCollapsed((prev) => !prev)} disabled={!dropdown} className='w-full'>
                    <div className='flex gap-4 items-center justify-between w-full'>
                        <div className='flex items-center gap-4'>

                            <QuestionIcon size={26} />
                            <strong>{title ?? `Exercise Set ${exercisenumber}`}  </strong>
                        </div>
                        <div className='flex items-center gap-4'>

                            <div className='text-white'>
                                {correctCount} / {totalCount}
                            </div>
                            <div className="h-5 w-[200px] bg-gray-300 rounded-md overflow-hidden">
                                {/* Progress indicator */}
                                {
                                    correctCount === totalCount ? (
                                        <div
                                            className="h-full bg-green-500 transition-all duration-300 ease-in-out"
                                            style={{
                                                width: `${progressPercent}%`,
                                                boxShadow: '0 0 5px rgb(37, 121, 68), 0 0 10px rgb(55, 156, 91), 0 0 15px rgb(50, 115, 75)',
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="h-full bg-green-500 transition-all duration-300 ease-in-out rounded-md"
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    )
                                }
                            </div>
                            {
                                correctCount === totalCount ? (
                                    <Lottie
                                        animationData={checkmarkAnimation}
                                        autoplay={true}
                                        loop={false}
                                        style={{ height: "3rem" }}
                                    />
                                ) : (
                                    <div className='h-[48px] w-[48px]'></div>
                                )
                            }
                        </div>
                    </div>
                </button>
            </div>

            <div className={collapsed ? "hidden" : "block"}>
                {childrenWithAnswerChange.map((child, index) =>
                    React.cloneElement(child, {
                        key: child.key ?? index,
                        onAnswerChange: isCorrect => handleAnswerChange(child.key ?? index, isCorrect),
                        exercisenumber: exercisenumber
                    })
                )}
            </div>
        </div>
    )
}
