import { Multiple, QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import { Input } from "@/components/ui/input";

type Props = {
    QuizInputs: QuizInput[],
    quizInputs: QuizInput,
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>
    groupkey: number
}

const TrueResponse = ({ quizInputs, QuizInputs, setQuizinputs, groupkey }: Props) => {
    return (
        <div>
            {
                quizInputs.type === "unique" ?
                    <div>
                        <p className="badge font-black">Choisir la bonne proposition</p>
                        <select defaultValue="Bonne reponse" className="select w-full select-info border"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const copies = [...QuizInputs];
                                (copies[groupkey] as { trueResponse: string }).trueResponse = e.target.value;
                                setQuizinputs(copies)
                            }}
                        >
                            <option disabled={true}>Bonne reponse</option>
                            {
                                quizInputs.choice.map((opt, k) => (
                                    <option
                                        key={k}
                                        value={`${opt}`}
                                    >
                                        {opt}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    :
                    <div>
                        <p className="badge font-black">Choisir les bonnes proposition</p>
                        <div className="grid grid-cols-2 ">
                            {
                                quizInputs.choice.map((check, k) => (
                                    <div className="flex items-center" key={k}>
                                        <input type="checkbox"
                                            className="checkbox checkbox-sm checkbox-primary border-2 border-gray-400"
                                            checked={check.isChecked}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const copies = [...QuizInputs];
                                                (copies[groupkey].choice[k] as Multiple).isChecked = e.target.checked
                                                setQuizinputs(copies)
                                            }}
                                        />
                                        <div className="tooltip tooltip-info ml-2" data-tip={check.proposition}>
                                            <button className="badge text-xs">proposition {k + 1}</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    );
}

export default TrueResponse;