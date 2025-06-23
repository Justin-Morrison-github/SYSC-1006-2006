export default function Array({ string, type, array, shownull = "true" }) {
    let parsedArray;

    // Prefer array if provided, otherwise derive from string
    if (array) {
        try {
            parsedArray = JSON.parse(array);
        } catch (e) {
            console.error("Invalid JSON array:", array);
            parsedArray = [];
        }
    } else if (string) {
        parsedArray = [...string];
        if (type === "string") {
            parsedArray.push("\\0");
        }
    } else {
        parsedArray = [];
    }

    if (shownull === "false") {
        parsedArray = parsedArray.slice(0, -1)
    }

    return (
        <div className="flex items-end mb-4">
            {parsedArray.map((char, index) => (
                <div key={index} className="flex flex-col items-center">
                    {/* Index */}
                    <div className="text-xs text-yellow-500">{index}</div>

                    {/* Box */}
                    <div
                        className={`w-12 h-12 border flex items-center justify-center text-center font-mono text-lg ${char === "\\0" || char === "\0" ? "text-blue-500" : ""
                            }`}
                    >
                        {char === "\0" && shownull === "true" ? "\\0" : char}
                    </div>
                </div>
            ))}
        </div>
    );
}
