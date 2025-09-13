const headerColor = "#030712"

export default function Header({ children }) {
    return (
        <div className="fixed top-0 left-0 w-full h-16 flex items-center px-4 z-[50] shadow-md border-b border-gray-500 text-white"
            style={{ backgroundColor: headerColor }}>
            {children}
        </div>
    )
}