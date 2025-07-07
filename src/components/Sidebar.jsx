import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronDown, ChevronUp } from 'lucide-react'; // install lucide-react or use heroicons
import ReactDOM from "react-dom";

const headerColor = "#030712"

const HLineBreak = ({ className }) => <div className={className}></div>

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const [manifest, setManifest] = useState({ lectures: [], exercises: [] });
    const [showLectures, setShowLectures] = useState(true)
    const [showExercises, setShowExercises] = useState(true)

    useEffect(() => {
        fetch('/content/manifest.json')
            .then((res) => res.json())
            .then(setManifest)
            .catch(console.error);
    }, []);

    const [selectedLecture, setSelectedLecture] = useState(null)
    const lectureSelect = (index) => {

        if (index === selectedLecture) {
            setSelectedLecture(null)
        }
        else {
            setSelectedLecture(index);
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-12 flex items-center px-4 z-[50] shadow-md border-b border-gray-500"
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


            <div className={`fixed top-12 left-0 h-[calc(100%-3rem)] w-64 bg-gray-900 text-white transform transition-transform z-[40] overflow-y-auto [&::-webkit-scrollbar]:[width:0px] [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#3b82f6] border-r border-gray-500 overflow-x-hidden
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <h2 className="text-2xl font-bold  pt-4 pb-2 pl-4">Navigation</h2>


                <div className='flex flex-col justify-start items-start w-full '>
                    <Link to="/" onClick={() => setSidebarOpen(false)} className='w-full px-6 py-2 hover:bg-white/10 text-lg'>
                        Home
                    </Link>
                    <Link to="/overview" onClick={() => setSidebarOpen(false)} className='w-full px-6 py-2 hover:bg-white/10 text-lg'>
                        Course Overview
                    </Link>
                    <Link to="/report-bug" onClick={() => setSidebarOpen(false)} className='w-full px-6 py-2 hover:bg-white/10 text-lg'>
                        Report a Bug
                    </Link>
                </div>

                {/* <HLineBreak className="h-px bg-slate-700 mt-2 mx-2" /> */}

                <button className='flex items-center justify-between w-full'
                    onClick={() => {
                        setShowLectures((prev) => !prev);
                        setSelectedLecture(null)
                    }}>
                    <span className="text-xl font-bold px-6" >Lectures</span>
                    {showLectures ? <ChevronUp size={32} className='m-2' /> : <ChevronDown size={32} className='m-2' />}
                </button>

                {
                    showLectures && manifest.lectures.map((lecture, index) => (
                        <div key={index}>
                            {/* <HLineBreak className="h-px bg-slate-700 my-2 mx-6" /> */}
                            <div className={`flex flex-col  transition-all duration-100 ${index === selectedLecture ? "border-l-[8px] border-blue-500 bg-white/5" : ""}`} >
                                {/* <HLineBreak className="h-px bg-slate-700" /> */}

                                <div
                                    onClick={() => lectureSelect(index)}
                                    className={`w-full text-lg text-zinc-300 font-semibold hover:bg-white/10 px-8 py-2 ${selectedLecture === index ? 'bg-gray-400/10' : ''}`}>
                                    {lecture.title}
                                </div>

                                <div className={` w-full flex flex-col overflow-hidden transition-all duration-300 ${selectedLecture === index ? 'max-h-[500px]' : 'max-h-0'}`}>
                                    {lecture.topics.map((topic) => (
                                        <Link
                                            key={topic.slug}
                                            className="text-blue-500 hover:bg-white/10 pl-12 text-md w-full py-1"
                                            to={`/lectures/${lecture.slug}/${topic.slug}`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            {topic.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
                {/* <HLineBreak className="h-px bg-slate-700 my-4 mx-2" /> */}

                {
                    showLectures && manifest.lectures.map((lecture) => (
                        <div key={lecture.slug} className="mb-4 ml-4">
                            <h3 className="font-semibold text-lg">{lecture.title}</h3>
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
                {/* <HLineBreak className="h-px bg-slate-700  mx-2" /> */}

                {/* <HLineBreak className="w-full h-px bg-blue-500 my-4" /> */}


                <button className='flex gap-1 items-center' onClick={() => setShowExercises((prev) => !prev)}>
                    <span className="text-2xl font-bold text-[#3b82f6] p-2" >Exercises</span>
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
                <HLineBreak className="h-px bg-slate-700 my-4 mx-2" />

                {/* <HLineBreak className="w-full h-px bg-blue-500 my-4" /> */}
            </div>

            {/* <div className={`fixed top-12 left-0 h-[calc(100%-3rem)] w-64 bg-gray-900 text-white p-4 transform transition-transform z-[40] overflow-y-auto [&::-webkit-scrollbar]:[width:10px] [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#3b82f6] 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                <ul className="space-y-2">
                    <li><Link to="/" onClick={() => setSidebarOpen(false)}>Home</Link></li>
                    <li><Link to="/overview" onClick={() => setSidebarOpen(false)}>Course Overview</Link></li>
                    <li><Link to="/report-bug" onClick={() => setSidebarOpen(false)}>Report a Bug</Link></li>

                </ul>
                <button className='flex gap-1 mt-8 mb-2 items-center' onClick={() => setShowLectures((prev) => !prev)}>
                    <span className="text-2xl font-bold text-[#3b82f6]" >Lectures</span>
                    {showLectures ? <ChevronUp size={32} className='mt-2' /> : <ChevronDown size={32} className='mt-2' />}
                </button>
                {
                    showLectures && manifest.lectures.map((lecture) => (
                        <div key={lecture.slug} className="mb-4 ml-2 hover:bg-blue-500">
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
            </div> */}

        </>
    );
}
