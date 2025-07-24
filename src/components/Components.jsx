import { COLORS } from "./MarkdownRenderer"
export const JLoadedTitle = ({ formattitle, exerciseNum, questionNum, question }) => (
    <div className='flex gap-2 justify-left items-center pt-2 ml-2 border-b-2 w-max text-xl text-white'
        style={{ borderColor: COLORS.exercise }}>

        <div className="font-semibold">
            {formattitle ? `${exerciseNum}.${questionNum}` : `${questionNum}.`}
        </div>

        <div>
            {question}
        </div>
    </div>
)