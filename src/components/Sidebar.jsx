// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react'; // install lucide-react or use heroicons

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    // const [open, setOpen] = useState(false);
    const [manifest, setManifest] = useState({ lectures: [], exercises: [] });

    useEffect(() => {
        fetch('/content/manifest.json')
            .then((res) => res.json())
            .then(setManifest)
            .catch(console.error);
    }, []);

    return (
        <>
            {/* <div className='fixed bg-blue-500 h-8'>
                test
                <button
                    className="fixed top-4 left-2 z-50 text-white p-2 rounded-lg"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
                </button>
                <div className={`fixed top-6 left-16 text-xl ${sidebarOpen ? "z-[50]" : "z-0"}`}>
                    Name of Thing
                </div>
            </div> */}
            <div className="fixed top-0 left-0 w-full h-12 bg-blue-500 flex items-center px-4 z-50 shadow-md">
                {/* Sidebar Toggle Button */}
                <button
                    className="text-white p-2 mr-4"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                </button>

                {/* Product Name */}
                <span className="text-white text-lg font-semibold">Name of Thing</span>
            </div>

            <div className={`fixed top-12 left-0 h-[calc(100%-3rem)] w-64 bg-gray-900 text-white p-4 transform transition-transform z-[40] overflow-y-auto
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                <ul className="space-y-2">
                    <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
                    {/* Add more global links here */}
                </ul>
                <h2 className="text-xl font-bold mt-8 mb-4">Lectures</h2>

                {manifest.lectures.map((lecture) => (
                    <div key={lecture.slug} className="mb-4">
                        <h3 className="font-semibold">{lecture.title}</h3>
                        <ul className="ml-4 list-disc">

                            {lecture.topics.map((topic) => (
                                <li key={topic.slug}>
                                    <Link
                                        className="text-blue-400 hover:underline"
                                        to={`/lectures/${lecture.slug}/${topic.slug}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {topic.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
