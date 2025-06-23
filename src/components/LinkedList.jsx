export default function LinkedList({ elements, showHead = true, showTail = true }) {
    let parsedArray;
    try {
        parsedArray = JSON.parse(elements);
    } catch (e) {
        console.error("Invalid JSON array:", elements);
        parsedArray = [];
    }

    // Constants
    const BOX_WIDTH = 40;
    const BOX_HEIGHT = 40;
    const ARROW_WIDTH = 50;
    const ARROW_HEIGHT = 24;
    const CURVE_RADIUS = 10;
    const TAIL_HEIGHT = 30;

    const HEAD_WIDTH = BOX_WIDTH + 10;

    // Arrow components
    const Line = ({ width }) => (
        <line x1="0" y1="12" x2={width - 5} y2="12" stroke="white" strokeWidth="2" />
    );

    const ArrowHead = ({ offset = 10, fill = "white" }) => (
        <polygon
            points={`${ARROW_WIDTH - offset},6 ${ARROW_WIDTH},12 ${ARROW_WIDTH - offset},18`}
            fill={fill}
        />
    );

    const EndOfList = () => (
        <>
            <line x1={ARROW_WIDTH - 6} y1="4" x2={ARROW_WIDTH - 6} y2="20" stroke="white" strokeWidth="2" />
            <line x1={ARROW_WIDTH - 1} y1="4" x2={ARROW_WIDTH - 1} y2="20" stroke="white" strokeWidth="2" />
        </>
    );

    // Total width to reach last node for tail arrow
    const nodeSectionWidth = parsedArray.length * (BOX_WIDTH * 2 + ARROW_WIDTH - 20); // box + arrow + offset
    const totalWidth = showHead ? nodeSectionWidth + HEAD_WIDTH + ARROW_WIDTH : nodeSectionWidth;

    const tailTargetX = totalWidth - (BOX_WIDTH * 2 + ARROW_WIDTH) + BOX_WIDTH / 2 - HEAD_WIDTH + 10;
    const arrowHeadSize = 10;
    const pathD = `
        M 0 ${TAIL_HEIGHT / 2}
        H ${tailTargetX}
        A ${CURVE_RADIUS} ${CURVE_RADIUS} 0 0 0 ${tailTargetX + CURVE_RADIUS} ${TAIL_HEIGHT / 2 - CURVE_RADIUS}
        V -${arrowHeadSize}
    `;

    const tailArrow = (
        <svg
            width={tailTargetX + CURVE_RADIUS + 10}
            height={TAIL_HEIGHT + arrowHeadSize + 25}
            viewBox={`0 -${arrowHeadSize} ${tailTargetX + CURVE_RADIUS + 10} ${TAIL_HEIGHT + arrowHeadSize}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={pathD} fill="none" stroke="white" strokeWidth="2" />
            <polygon
                points={`${tailTargetX + CURVE_RADIUS - 6},-${arrowHeadSize} ${tailTargetX + CURVE_RADIUS + 6},-${arrowHeadSize} ${tailTargetX + CURVE_RADIUS},-${arrowHeadSize + 10}`}
                fill="white"
            />
        </svg>
    );


    return (
        <div className="flex flex-col my-2">
            {/* Linked list */}
            <div className="flex items-center">
                {showHead && (
                    <div className="flex items-center">
                        <div
                            className="border rounded font-mono flex items-center justify-center"
                            style={{ width: HEAD_WIDTH, height: BOX_HEIGHT }}
                        >
                            head
                        </div>
                        <svg width={ARROW_WIDTH} height={ARROW_HEIGHT} viewBox={`0 0 ${ARROW_WIDTH} ${ARROW_HEIGHT}`}>
                            <Line width={ARROW_WIDTH} />
                            <ArrowHead />
                        </svg>
                    </div>
                )}
                {/* Linked list nodes */}
                {parsedArray.map((el, idx) => (
                    <div key={idx} className="flex items-center">
                        <div className="border rounded-l font-mono flex items-center justify-center" style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}>
                            {el}
                        </div>
                        <div className="border rounded-r" style={{ width: BOX_WIDTH, height: BOX_HEIGHT }} />
                        <svg
                            width={ARROW_WIDTH}
                            height={ARROW_HEIGHT}
                            className="-ml-5"
                            viewBox={`0 0 ${ARROW_WIDTH} ${ARROW_HEIGHT}`}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Line width={ARROW_WIDTH} />

                            {idx < parsedArray.length - 1 ? <ArrowHead /> : <EndOfList />}
                        </svg>
                    </div>
                ))}
            </div>

            {/* Tail pointer */}
            {
                showTail && (
                    <div className="flex items-center justify-start">
                        <div
                            className="border rounded font-mono flex items-center justify-center"
                            style={{ width: HEAD_WIDTH, height: BOX_HEIGHT }}
                        >
                            tail
                        </div>
                        {tailArrow}
                    </div>
                )
            }
        </div>
    );
}
