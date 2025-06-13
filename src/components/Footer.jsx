

export default function Footer({ children, ...props }) {
    return (
        <>
            <br />
            <div className="w-full h-px bg-gray-300 my-4" />
            <div className='h-16 mt-8 w-full flex items-center justify-between'>
                {children}
            </div>

        </>
    )

}
