import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronDown, ChevronUp } from 'lucide-react'; // install lucide-react or use heroicons
import SidebarButton from './SidebarButton';
import SidebarGroupButton from './SidebarGroupButton';
import Header from './Header';

import DarkLogo from "../media/dark_logo.svg"


const headerColor = "#030712"

const HLineBreak = ({ className }) => <div className={className}></div>

const SidebarElement = ({ children, isOpen }) => (
    <div className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white transform transition-transform z-[40] overflow-y-auto [&::-webkit-scrollbar]:[width:0px] [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#3b82f6] border-r border-gray-500 overflow-x-hidden
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {children}
    </div>
)

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const [manifest, setManifest] = useState({ lectures: [], exercises: [] });
    const [showLectures, setShowLectures] = useState(false)
    const [showExercises, setShowExercises] = useState(false)

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'content/manifest.json')
            .then((res) => res.json())
            .then(setManifest)
            .catch(console.error);
    }, []);

    const [selectedLecture, setSelectedLecture] = useState(null)

    const lectureSelect = (index) => {
        setSelectedLecture(index === selectedLecture ? null : index)
    }

    const topLevelLinks = [
        { text: "Home", path: "/" },
        { text: "Course Overview", path: "/overview" },
        { text: "Report a Bug", path: "/report-bug" },
    ]

    return (
        <div className='bg-yellow-600'>

            <button className="fixed top-4 left-0 p-2 z-50" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <XIcon className="w-10 h-10" /> : <MenuIcon className="w-10 h-10" />}
            </button>


            <SidebarElement isOpen={sidebarOpen}>
                <img src={DarkLogo} alt="Logo" className='relative left-14 px-2 h-16 top-4 mb-8' />

                <div className='flex flex-col justify-start items-start w-full '>
                    {
                        topLevelLinks.map((link) => (
                            <Link key={link.path} to={link.path} onClick={() => setSidebarOpen(false)} className='w-full pl-4 py-2 hover:bg-white/10 text-lg'>
                                {link.text}
                            </Link>
                        ))
                    }
                </div>

                <SidebarGroupButton title={"Lectures"} selected={showLectures}
                    onClick={() => {
                        setShowLectures((prev) => !prev);
                        setSelectedLecture(null)
                    }} >
                </SidebarGroupButton>

                {
                    showLectures && manifest.lectures.map((lecture, index) => (
                        <div key={index} className={`flex flex-col transition-all duration-150 ${index === selectedLecture ? "border-l-[8px] border-blue-500 bg-white/5" : ""}`} >
                            <SidebarButton onClick={() => lectureSelect(index)} selectCondition={selectedLecture === index}>
                                {lecture.title}
                            </SidebarButton>

                            <div className={` w-full flex flex-col overflow-hidden transition-all duration-300 ${selectedLecture === index ? '' : 'max-h-0'}`}>
                                {lecture.topics.map((topic) => (
                                    <Link
                                        key={topic.slug}
                                        className="flex items-center text-blue-500 hover:bg-white/10 pl-12 text-md w-full h-10"
                                        to={`/lectures/${lecture.slug}/${topic.slug}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        {topic.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                }
                <SidebarGroupButton title={"Exercises"} selected={showExercises}
                    onClick={() => {
                        setShowExercises((prev) => !prev);
                        setSelectedLecture(null)
                    }} >
                </SidebarGroupButton>

                {
                    showExercises && manifest.exercises.map((exercise, index) => (
                        <div key={index} className={`flex flex-col transition-all duration-100`} >
                            <Link
                                className="flex items-center text-blue-500 hover:bg-white/10 pl-8 text-lg w-full h-12"
                                to={`/exercises/${exercise.slug}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {exercise.title}
                            </Link>

                        </div>
                    ))
                }
            </SidebarElement>
        </div>
    );
}
