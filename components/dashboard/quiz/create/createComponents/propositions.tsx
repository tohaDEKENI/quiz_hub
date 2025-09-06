import { Multiple, QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import AddAndRemoveBtn from "./AddAndRemoveBtn";

type Props = {
    quizInputs: QuizInput,
    QuizInputs: QuizInput[],
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>,
    groupkey: number,
}

const Proposition = ({ QuizInputs, quizInputs, groupkey, setQuizinputs }: Props) => {
    return (
        <div className="space-y-2 ">
            {
                quizInputs.type === "unique" ?
                    quizInputs.choice.map((input, singlekey) => (
                        <div key={singlekey}>
                            <input type="text"
                                required
                                className="input w-full border"
                                value={input}
                                placeholder={`Proposition ${singlekey+1}`}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const copies = [...QuizInputs]
                                    copies[groupkey].choice[singlekey] = e.target.value
                                    setQuizinputs(copies)
                                }}
                            />
                        </div>
                    ))
                    :
                    quizInputs.choice.map((input, singlekey) => (
                        <div key={singlekey}>
                            <input type="text"
                                required
                                className="input w-full border"
                                value={input.proposition}
                                placeholder={`Proposition ${singlekey+1}`}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const copies = [...QuizInputs];
                                    (copies[groupkey].choice as Multiple[])[singlekey].proposition = e.target.value
                                    setQuizinputs(copies)
                                }}
                            />
                        </div>
                    ))
            }

            <AddAndRemoveBtn setQuizinputs={setQuizinputs} quizInputs={quizInputs} groupkey={groupkey} QuizInputs={QuizInputs} />

        </div>
    );
}

export default Proposition;