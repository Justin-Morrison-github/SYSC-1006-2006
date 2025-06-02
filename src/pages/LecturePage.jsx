import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function LecturePage() {
    const { slug } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        import(`../content/${slug}.md?raw`)
            .then((module) => {
                setContent(module.default);
            })
            .catch((err) => {
                console.error("Failed to load markdown file:", err);
                setContent('# Not Found\nCould not load the requested lecture.');
            });
    }, [slug]);

    return (
        <div className="">
            <MarkdownRenderer content={content} />
        </div>
    );
}
