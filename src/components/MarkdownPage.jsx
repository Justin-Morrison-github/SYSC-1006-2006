// src/components/MarkdownPage.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MarkdownRenderer from './MarkdownRenderer'


import Footer from '../components/Footer'
import NavigationFooter from '../components/NavigationFooter'
import manifest from '../content/manifest.json';

function getFlatLectureList(manifest) {
    const pages = [];

    manifest.lectures.forEach(lecture => {
        lecture.topics.forEach(topic => {
            pages.push({
                path: `/lectures/${lecture.slug}/${topic.slug}`,
                title: topic.title,
            });
        });
    });

    return pages;
}


export default function MarkdownPage({ type = 'lectures' }) {
    const { lectureSlug, topicSlug, slug } = useParams()
    const [content, setContent] = useState('Loading...')

    const flatList = getFlatLectureList(manifest);
    const currentPath = `/lectures/${lectureSlug}/${topicSlug}`;
    const currentIndex = flatList.findIndex(p => p.path === currentPath);

    const prevPage = flatList[currentIndex - 1] || null;
    const nextPage = flatList[currentIndex + 1] || null;


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

    return (
        <MarkdownRenderer content={content} slugs={{ lecture: lectureSlug, topic: topicSlug }}>
            <Footer>
                {prevPage ? (
                    <NavigationFooter link={prevPage.path} type={"Previous"}>← {prevPage.title}</NavigationFooter>
                ) : <div />}

                {nextPage ? (
                    <NavigationFooter link={nextPage.path} type={"Next"}>{nextPage.title} →</NavigationFooter>
                ) : <div />}
            </Footer>
        </MarkdownRenderer >
    )
}
