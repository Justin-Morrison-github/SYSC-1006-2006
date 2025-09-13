import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex min-h-screen bg-gray-950 text-white transition-all">
            <div
                className={`transition-all duration-200 bg-slate-900 h-screen z-50 ${sidebarOpen ? "w-[288px]" : "w-14"}`}
            >
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
