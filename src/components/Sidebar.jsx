// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronDown, ChevronUp } from 'lucide-react'; // install lucide-react or use heroicons

const headerColor = "#030712"

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    // const [open, setOpen] = useState(false);
    const [manifest, setManifest] = useState({ lectures: [], exercises: [] });
    const [showLectures, setShowLectures] = useState(true)
    const [showExercises, setShowExercises] = useState(true)

    useEffect(() => {
        fetch('/content/manifest.json')
            .then((res) => res.json())
            .then(setManifest)
            .catch(console.error);
    }, []);

    return (
        <div className=''>
            <div className="fixed top-0 left-0 w-full h-12 flex items-center px-4 z-[50] shadow-md"
                style={{ backgroundColor: headerColor }}>
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

            <div className={`fixed top-12 left-0 h-[calc(100%-3rem)] w-64 bg-gray-900 text-white p-4 transform transition-transform z-[40] overflow-y-auto [&::-webkit-scrollbar]:[width:10px] [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#3b82f6] 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                <ul className="space-y-2">
                    <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
                    <li><Link to="/overview" onClick={() => setSidebarOpen(false)}>Course Overview</Link></li>
                    <li><Link to="/report-bug" onClick={() => setSidebarOpen(false)}>Report a Bug</Link></li>
                    {/* Add more global links here */}

                </ul>
                {/* <h2 className="text-xl font-bold mt-8 mb-4">Lectures</h2> */}
                <button className='flex gap-1 mt-8 mb-2 items-center' onClick={() => setShowLectures((prev) => !prev)}>
                    <span className="text-2xl font-bold text-[#3b82f6]" >Lectures</span>
                    {showLectures ? <ChevronUp size={32} className='mt-2' /> : <ChevronDown size={32} className='mt-2' />}
                </button>
                {
                    showLectures && manifest.lectures.map((lecture) => (
                        <div key={lecture.slug} className="mb-4 ml-2">
                            <h3 className="font-semibold">{lecture.title}</h3>
                            <ul className="ml-6 list-disc">
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
                    ))
                }

                <button className='flex gap-1 mt-8 mb-2 items-center' onClick={() => setShowExercises((prev) => !prev)}>
                    <span className="text-2xl font-bold text-[#3b82f6]" >Exercises</span>
                    {showExercises ? <ChevronUp size={32} className='mt-2' /> : <ChevronDown size={32} className='mt-2' />}
                </button>
                {
                    showExercises && manifest.exercises.map((exercise) => (
                        <div key={exercise.slug} className="mb-4 ml-2">
                            <ul className="ml-2 list-disc">
                                <Link
                                    className="text-blue-400 hover:underline"
                                    to={`/exercises/${exercise.slug}`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {exercise.title}
                                </Link>
                            </ul>
                        </div>
                    ))
                }


            </div>
        </div>
    );
}
