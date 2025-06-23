import { ArrowDownIcon } from '@primer/octicons-react';
import { ArrowRight, ArrowRightIcon } from 'lucide-react';
import React from 'react';

export default function Recurse({ name, x }) {

    const Line = ({ width }) => (
        <line x1="0" y1="12" x2={width - 5} y2="12" stroke="white" strokeWidth="2" />
    );

    const ArrowHead = ({ offset = 10, fill = "white" }) => (
        <polygon
            points={`${ARROW_WIDTH - offset},6 ${ARROW_WIDTH},12 ${ARROW_WIDTH - offset},18`}
            fill={fill}
        />
    );

    const elements = [];

    for (let i = x; i > 0; i--) {
        elements.push(i);
    }

    return (
        <div className="flex flex-col gap-2">
            {elements.map((elem, index) => (
                <div key={index} className="w-max">
                    <div className="flex flex-row gap-4 items-center w-max">
                        {/* Left: Box and inner content */}
                        <div className="font-mono border">
                            <div className="py-2 px-2">{name}</div>
                            <div className="flex pb-2">
                                <div className="flex items-center pl-6 pr-4">x</div>
                                <div className="min-w-10 h-10 border w-max flex items-center justify-center text-center p-2 font-mono">
                                    {elem}
                                </div>
                            </div>
                        </div>

                        {/* Right: Matching text */}
                        <div className="text-sm font-light">This text matches: {elem}</div>
                    </div>

                    {/* Optional Arrow Below */}
                    {index < elements.length - 1 && (
                        <div className="flex justify-center w-1/2">
                            <ArrowDownIcon size={32} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

}