import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [manifest, setManifest] = useState({ lectures: [], exercises: [] })

    useEffect(() => {
        fetch('/content/manifest.json')
            .then((res) => res.json())
            .then(setManifest)
            .catch((err) => console.error('Failed to load manifest:', err))
    }, [])

    return (
        <div className="p-8 markdown-body">
            <h1 className="text-3xl font-bold mb-6">Course Home</h1>

            <section className="mb-10">
                {/* <h2 className="text-2xl font-semibold mb-4">Lectures</h2> */}
                {manifest.lectures.map((lecture) => (
                    <div key={lecture.slug} className="mb-6">
                        <h3 className="text-xl font-semibold">{lecture.title}</h3>
                        <ul className="list-disc pl-6 space-y-1 mt-1">
                            {lecture.topics.map((topic) => (
                                <li key={topic.slug}>
                                    <Link
                                        className="text-blue-600 hover:underline"
                                        to={`/lectures/${lecture.slug}/${topic.slug}`}
                                    >
                                        {topic.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* exercises can go here the same way if you want nested grouping */}
        </div>
    )
}
