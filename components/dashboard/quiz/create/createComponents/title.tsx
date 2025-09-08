'use client'

import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";

type Props = {
    quizInputs: QuizInput;
    QuizInputs: QuizInput[];
    groupkey: number;
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>;
};

const QuizTitle = ({ quizInputs, QuizInputs, groupkey, setQuizinputs }: Props) => {
    const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copies = [...QuizInputs];
        copies[groupkey].title = e.target.value;
        setQuizinputs(copies);
    };

    return (
        <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">Écrivez la question pour ce quiz </span>
            <input
                required
                value={quizInputs.title}
                onChange={handleSetTitle}
                type="text"
                placeholder="Votre question ici..."
                className="input w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

        </div>
    );
};

export default QuizTitle;
