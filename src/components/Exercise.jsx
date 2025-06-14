import React, { useState, isValidElement } from 'react';
import { QuestionIcon } from '@primer/octicons-react';
import Lottie from "lottie-react";
import checkmarkAnimation from '../assets/animations/checkmark.json'

const pop_up_style1 = "border-l-4 p-4 my-8 bg-zinc-800 rounded-md"
const pop_up_style2 = "border-l-4 p-4 my-8 bg-zinc-900"

export default function Exercise({ children, title, dropdown = true, initialCollapsed = false, color }) {
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
        ["quiz", "dropquiz", "jquiz", "vjquiz", "fillblank"].includes(child.type.name)
    );

    const totalCount = childrenWithAnswerChange.length;
    const correctCount = Object.values(correctMap).filter(Boolean).length;
    const progressPercent = totalCount === 0 ? 0 : (correctCount / totalCount) * 100;


    return (
        <div className={pop_up_style1} style={{ borderColor: color }}>
            <div className='sticky top-12 h-12 bg-zinc-800 z-[40]' style={{ color: color, fontSize: "x-large" }} >
                <button onClick={() => setCollapsed((prev) => !prev)} disabled={!dropdown}>
                    <div className='flex gap-4 items-center'>
                        <QuestionIcon size={20} />
                        <strong>{title}</strong>
                        <div className='text-white'>
                            {correctCount} / {totalCount}
                        </div>



                        <div className="h-5 w-[200px] bg-gray-300 rounded-lg">
                            {/* Progress indicator */}
                            {
                                correctCount === totalCount ? (
                                    <div
                                        className="h-full bg-green-500 transition-all duration-300 ease-in-out rounded"
                                        style={{
                                            width: `${progressPercent}%`,
                                            boxShadow: '0 0 5px rgb(37, 121, 68), 0 0 10px rgb(55, 156, 91), 0 0 15px rgb(50, 115, 75)',
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="h-full bg-green-500 transition-all duration-300 ease-in-out"
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
                                <div className='h-[48px]'></div>
                            )

                        }
                    </div>
                </button>

            </div>
            {
                !collapsed &&
                (
                    <div>
                        {childrenWithAnswerChange.map((child, index) =>
                            React.cloneElement(child, {
                                key: child.key ?? index,
                                onAnswerChange: isCorrect => handleAnswerChange(child.key ?? index, isCorrect),
                            })
                        )}
                    </div>
                )
            }
        </div>
    )
}
