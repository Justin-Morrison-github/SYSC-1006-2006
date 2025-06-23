import MultiQuiz from './MultiQuiz';
import VJQuiz from './VJQuiz';
import JQuiz from './JQuiz';

export default function Quiz({ type, question, onAnswerChange, slugs, exercisenumber }) {

    const validTypes = ["multiselect", "vertical", "horizontal"]
    if (!validTypes.includes(type)) {
        console.error("Invalid type", type)
        return <div>Error</div>;
    }

    if (type === "horizontal") {
        return (
            <JQuiz question={question} onAnswerChange={onAnswerChange} slugs={slugs} exercisenumber={exercisenumber} />
        )
    }

    else if (type === "vertical") {
        return (
            <VJQuiz question={question} onAnswerChange={onAnswerChange} slugs={slugs} exercisenumber={exercisenumber} />
        );
    }

    else if (type === "multiselect") {
        return (
            <MultiQuiz question={question} onAnswerChange={onAnswerChange} slugs={slugs} exercisenumber={exercisenumber} />
        )
    }

    else {
        return (
            <div className='markdown-body px-4 py-2 border border-slate-500 rounded-md my-4 rounded-md'>
                Not found {type}
            </div>
        )
    }


}
