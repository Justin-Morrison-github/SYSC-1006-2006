import { Link } from 'react-router-dom';


export default function Next({ link, children, type, ...props }) {
    if (!link) {
        return <div></div>;
    }

    if (type !== "Next" && type !== "Previous") {
        return <div>Invalid Type {type} Passed to NavigationFooter</div>
    }

    const textAlign = type === "Next" ? "text-right" : "text-left"

    return <div className={`py-2 px-4 items-center border rounded-md ${textAlign}`}>
        <div className={`font-bold text-bold-500 text-lg`}>
            {type}
        </div>
        <Link to={link} className="underline text-2xl">
            {children}
        </Link>
    </div>

}
