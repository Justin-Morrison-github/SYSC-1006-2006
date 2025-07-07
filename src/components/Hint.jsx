import { useState, useMemo } from "react";

export default function Hint({ type, hint }) {
    const [giveHint, setGiveHint] = useState(false);
    const handleHintClick = () => {
        setGiveHint((prev) => !prev)
    }

    const HintButton = ({ className }) => {
        return hint ? (
            <button className={className}
                onClick={handleHintClick}
            >
                {giveHint ? "Hide" : "Hint"}
            </button>
        ) : null;
    }

    const HintLabel = () => {
        return giveHint ? (
            <div className='absolute left-full top-0 ml-[10px] text-yellow-400 w-max'>
                {hint}
            </div>
        ) : null;
    }


    if (type === "vjquiz") {
        return (
            <div className=" relative inline-block w-full">
                <HintButton className='text-white/80 text-left rounded hover:bg-slate-800 h-full w-full' />
                <HintLabel />
            </div>
        )
    }
    else if (type === "multiquiz") {
        return (
            <div className="relative">
                <HintButton className={"text-white/80 text-left rounded hover:bg-slate-800 h-full"} />
                <HintLabel />
            </div>
        )
    }
    else if (type === "jquiz") {
        return (
            <div className="text-yellow-700 py-2 mb-1 flex gap-4">
                <HintButton className={"text-white/80 text-left rounded hover:bg-slate-800 h-full"} />

                {
                    giveHint && (
                        <div className='absolute left-10 top-0 ml-[10px] text-yellow-400 w-max'>
                            {hint}
                        </div>
                    )
                }
                {
                    giveHint && (
                        <div className='text-yellow-400'>{hint}</div>
                    )
                }
            </div>
        )
    }
    else if (type === "fillblank") {
        return (
            <div className=" relative inline-block w-full">
                {
                    hint && (
                        <button className='text-white/80 text-left rounded hover:bg-slate-800 h-full w-full'
                            onClick={handleHintClick}
                        >
                            {giveHint ? "Hide" : "Hint"}
                        </button>
                    )
                }
                {
                    giveHint && (
                        <div className='absolute left-full top-0 ml-[10px] text-yellow-400 w-max'>{hint}</div>
                    )
                }
            </div>
        )
    }



}