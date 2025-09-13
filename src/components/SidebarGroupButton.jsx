import { ChevronDown, ChevronUp } from "lucide-react";

export default function SidebarGroupButton({ onClick, title, selected, children }) {

    return (
        <button className='flex items-center justify-between w-full'
            onClick={onClick}>
            <span className="text-xl font-bold pl-4" >{title}</span>
            {
                selected ? <ChevronUp size={32} className='m-2' />
                    : <ChevronDown size={32} className='m-2' />
            }
            {children}
        </button>
    )
}