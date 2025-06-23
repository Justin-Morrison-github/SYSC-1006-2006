export default function BugReport() {
    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Report a Bug</h1>
            <form
                action="https://formspree.io/f/xwpbbeaz"
                method="POST"
                className="flex flex-col gap-4"
            >
                <textarea
                    name="message"
                    className="w-full p-2 border border-gray-300 rounded-md min-h-[150px] text-black"
                    placeholder="Describe the bug..."
                    required
                />
                <input type="email" name="email" placeholder="Your email (optional)" className="p-2 border border-gray-300 rounded-md text-black" />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>

        </div>
    );
}