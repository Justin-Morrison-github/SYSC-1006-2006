const pop_up_style1 = "border-l-4 p-4 rounded-md my-4 bg-zinc-800"
const pop_up_style2 = "border-l-4 p-4 my-4 bg-zinc-900"

export default function PopUp({ color, icon, title, children, fontSize, ...props }) {
    const Icon = icon;

    return (
        <div className={pop_up_style1} style={{ borderColor: color }}>
            <div className='flex gap-2 items-center mb-2' style={{ color: color, fontSize: fontSize }} >
                {
                    Icon ? <Icon size={16} /> : null
                }
                <strong style={{ color: color }}>{title}</strong>
            </div>

            {children}
        </div>
    )
}