import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";

type Props = {
    quizInputs: QuizInput,
    QuizInputs: QuizInput[],
    groupkey: number,
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>
}
const QuizTitle = ({ quizInputs, QuizInputs, groupkey, setQuizinputs }: Props) => {
    const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copies = [...QuizInputs]
        copies[groupkey].title = e.target.value
        setQuizinputs(copies)
    };

    return (
        <div>
            <input
                required
                value={quizInputs.title}
                className="input input-primary w-full border"
                type="text"
                placeholder="Question"
                onChange={handleSetTitle}
            />
        </div>
    );
}

export default QuizTitle;