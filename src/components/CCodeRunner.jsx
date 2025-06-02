import React, { useState, lazy, Suspense } from "react";

// Lazy load Monaco Editor
const MonacoEditor = lazy(() => import("@monaco-editor/react"));

// export default function CCodeRunner() {
const CCodeRunner = ({ title = "C Code Runner (Wandbox)" }) => {

    const [code, setCode] = useState(`#include <stdio.h>

int main() {
    printf("Hello, Wandbox!\\n");
    return 0;
}`);
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const runCode = async () => {
        setLoading(true);
        setOutput("Running...");

        try {
            const response = await fetch("https://wandbox.org/api/compile.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code,
                    compiler: "gcc-13.2.0-c", // ✅ Valid C compiler
                    options: "warning,gnu11"  // ✅ C-only flags
                })
            });

            const result = await response.json();

            const outputText =
                result.program_error ||
                result.compiler_error ||
                result.compiler_message ||
                result.program_output ||
                "(No output)";
            setOutput(outputText);
        } catch (err) {
            setOutput("Error connecting to Wandbox.");
        }

        setLoading(false);
    };

    return (
        <div className="p-4 bg-zinc-900 text-white rounded-lg space-y-4">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <div className="rounded border border-zinc-700 overflow-hidden">
                <Suspense fallback={<div className="text-white">Loading editor...</div>}>
                    <MonacoEditor
                        height="300px"
                        defaultLanguage="c"
                        value={code}
                        theme="vs-dark"
                        onChange={(value) => setCode(value || "")}
                        padding="10px"
                        options={{
                            fontSize: 16,
                            lineNumbers: "on",
                            wordWrap: "on",
                            minimap: { enabled: false },
                            automaticLayout: true,
                            formatOnPaste: true,
                            scrollBeyondLastLine: false,
                            tabSize: 4,
                            insertSpaces: true,
                            matchBrackets: "always",

                        }}
                    />
                </Suspense>
            </div>

            <button
                onClick={runCode}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50"
            >
                {loading ? "Running..." : "Run Code"}
            </button>

            <div className="bg-zinc-800 p-3 rounded text-green-200 font-mono whitespace-pre-wrap min-h-[100px]">
                {output}
            </div>
        </div>
    );
}

export default CCodeRunner
