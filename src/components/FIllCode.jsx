

export default function FillCode({ }) {


    return (
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
            <code>
                <span className="text-purple-400">function</span>{" "}
                <span className="text-blue-400">greet</span>() {"{"}{"\n"}
                &nbsp;&nbsp;<span className="text-teal-400">console</span>.
                <span className="text-yellow-400">log</span>(
                <span className="text-green-400">"Hello, world!"</span>);
                {"\n"}
                &nbsp;&nbsp;<span className="text-gray-500 italic">// Enter your code in the box below</span>;
                {"\n"}

                &nbsp;&nbsp;<input type="text" className="bg-transparent border" />

                {"\n"}
                {"}"}
            </code>
        </pre>

    )
}