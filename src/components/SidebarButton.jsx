
export default function SidebarButton({ onClick, selectCondition, children }) {

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center text-lg text-zinc-300 hover:bg-white/10 pl-8 h-12 ${selectCondition ? 'bg-gray-400/10 font-bold' : ' font-semibold'}`}>
            {children}
        </button>
    )
}