// src/components/MarkdownPage.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MarkdownRenderer from './MarkdownRenderer'


import Footer from '../components/Footer'
import NavigationFooter from '../components/NavigationFooter'
import manifest from '../content/manifest.json';

function getFlatLectureList(manifest) {
    const lecturePages = [];
    const exercisePages = [];

    manifest.lectures.forEach(lecture => {
        lecture.topics.forEach(topic => {
            lecturePages.push({
                path: `/lectures/${lecture.slug}/${topic.slug}`,
                title: topic.title,
            });
        });
    });

    manifest.exercises.forEach(exercise => {
        exercisePages.push({
            path: `/exercises/${exercise.slug}`,
            title: exercise.title,
        });
    });

    return { lectures: lecturePages, exercises: exercisePages };
}


export default function MarkdownPage({ type = 'lectures' }) {
    const { lectureSlug, lectureTopicSlug, exerciseSlug } = useParams()
    const [content, setContent] = useState('Loading...')

    const flatList = getFlatLectureList(manifest);

    let currentPath = "";

    switch (type) {
        case "lectures":
            currentPath = `/lectures/${lectureSlug}/${lectureTopicSlug}`;
            break;
        case "exercises":
            currentPath = `/exercises/${exerciseSlug}`;
            break
    }

    const currentIndex = flatList?.[type].findIndex(p => p.path === currentPath);
    const prevPage = flatList?.[type][currentIndex - 1] || null;
    const nextPage = flatList?.[type][currentIndex + 1] || null;


    useEffect(() => {
        let path

        if (type === 'exercises') {
            path = `/content/exercises/${exerciseSlug}.md`
        } else if (type === 'overview') {
            path = `/content/overview.md`
        } else {
            path = `/content/lectures/${lectureSlug}/${lectureTopicSlug}.md`
        }

        fetch(path)
            .then((res) => {
                if (!res.ok) throw new Error('Not found')
                return res.text()
            })
            .then(setContent)
            .catch(() => setContent('# 404\nContent not found.'))
    }, [lectureSlug, lectureTopicSlug, exerciseSlug, type])

    return (
        <MarkdownRenderer content={content} slugs={{ lecture: lectureSlug, lectureTopic: lectureTopicSlug, exercise: exerciseSlug }}>
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
