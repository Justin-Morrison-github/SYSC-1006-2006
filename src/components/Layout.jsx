import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex min-h-screen bg-gray-950 text-white transition-all">
            <div
                className={`transition-all duration-200 ${sidebarOpen ? "w-[260px]" : "w-0"}`}
            >
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <main className="flex-1 pt-12">
                {children}
            </main>
        </div>
    );
}
