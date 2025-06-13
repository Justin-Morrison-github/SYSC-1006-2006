import FillInTheBlank from "./FillInTheBlank";
import Quiz from "./Quiz";
import DropQuiz from "./DropQuiz";
import JQuiz from "./JQuiz";

export default function Gradeable({ type, children, ...props }) {
    switch (type) {
        case "quiz":
            return <Quiz {...props}>{children}</Quiz>
        case "dropquiz":
            return <DropQuiz {...props}>{children}</DropQuiz>
        case "verticalquiz":
            return <Quiz {...props}>{children}</Quiz>
        case "jquiz":
            return <JQuiz {...props}>{children}</JQuiz>
        case "fillblank":
            return <FillInTheBlank {...props}>{children}</FillInTheBlank>
        default:
            break;
    }
}