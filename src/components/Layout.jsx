import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="relative min-h-screen bg-gray-950 text-white">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className={`relative pt-12 ml-0 transition-all ${sidebarOpen ? "left-[260px]" : "left-0"}`}>
                {children}
            </main>
        </div>
    );
}
