// src/components/MarkdownPage.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MarkdownRenderer from './MarkdownRenderer'

export default function MarkdownPage({ type = 'lectures' }) {
    const { lectureSlug, topicSlug, slug } = useParams()
    const [content, setContent] = useState('Loading...')

    useEffect(() => {
        let path

        if (type === 'exercises') {
            path = `/content/exercises/${slug}.md`
        } else if (type === 'overview') {
            path = `/content/overview.md`
        } else {
            path = `/content/lectures/${lectureSlug}/${topicSlug}.md`
        }

        fetch(path)
            .then((res) => {
                if (!res.ok) throw new Error('Not found')
                return res.text()
            })
            .then(setContent)
            .catch(() => setContent('# 404\nContent not found.'))
    }, [lectureSlug, topicSlug, slug, type])

    return <MarkdownRenderer content={content} />
}
