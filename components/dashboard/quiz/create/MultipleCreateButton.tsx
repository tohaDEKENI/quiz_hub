import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import { CheckSquare } from 'lucide-react'

type Props = {
    quizInputs: QuizInput[],
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>
}
const MultipleCreateButton = ({ quizInputs, setQuizinputs }: Props) => {
    return (
        <div>
            <button
                className="btn bg-green-500 text-white rounded-md"
                onClick={() => {
                    setQuizinputs((prev) => [...prev, { title: '', choice: [{ proposition: '', isChecked: false }, { proposition: '', isChecked: false }], type: 'multiple' }])
                }}
            > <CheckSquare /> Choix multiple
            </button>
        </div>
    );
}

export default MultipleCreateButton;
