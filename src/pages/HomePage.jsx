import { Link } from 'react-router-dom';

export default function HomePage() {
    const lectures = ['Data Types', 'ControlFlow', 'Expressions', 'Terminology', "functions", "recursive_function"]; // Match filenames (without .md)
    const subLectures = []
    return (
        <div className="markdown-body p-4 h-screen w-screen">
            <h1 className="text-2xl font-bold mb-4">Lectures</h1>
            <ul>
                {lectures.map(slug => (
                    <li key={slug}>
                        <Link to={`/lecture/${slug}`} className="text-blue-500 hover:underline">
                            {slug.charAt(0).toUpperCase() + slug.slice(1)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
