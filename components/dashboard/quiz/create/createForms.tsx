import { Multiple, QuizInput } from "@/lib/type";
import QuizTitle from "./createComponents/title";
import Proposition from "./createComponents/propositions";
import TrueResponse from "./createComponents/trueResponse";
import { SetStateAction } from "react";

type Props = {
    QuizInputs: QuizInput[],
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>
}
const CreateForm = ({ QuizInputs, setQuizinputs }: Props) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border border-gray-200 h-full p-4 overflow-y-auto
        ">
            {
                QuizInputs.map((quizInputs, groupkey) => (
                    <div key={groupkey} className="space-y-4 bg-base-200 p-2 border border-gray-200">
                        <QuizTitle quizInputs={quizInputs} QuizInputs={QuizInputs} groupkey={groupkey} setQuizinputs={setQuizinputs} />
                        <Proposition quizInputs={quizInputs} groupkey={groupkey} setQuizinputs={setQuizinputs} QuizInputs={QuizInputs} />
                        <TrueResponse quizInputs={quizInputs} setQuizinputs={setQuizinputs} QuizInputs={QuizInputs} groupkey={groupkey} />
                    </div>
                ))
            }
            <button
                onClick={() => {
                    console.log(QuizInputs)
                }}
                className="btn"
            >
                Voir
            </button>
        </div>
    );
}

export default CreateForm;