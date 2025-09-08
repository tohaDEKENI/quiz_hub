'use client'

import { Multiple, QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import AddAndRemoveBtn from "./AddAndRemoveBtn";

type Props = {
  quizInputs: QuizInput;
  QuizInputs: QuizInput[];
  setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>;
  groupkey: number;
};

const Proposition = ({ QuizInputs, quizInputs, groupkey, setQuizinputs }: Props) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 mb-1">
        Saisissez les propositions pour cette question
      </p>

      {quizInputs.type === "unique"
        ? quizInputs.choice.map((input, idx) => (
            <input
              key={idx}
              type="text"
              required
              value={input}
              placeholder={`Proposition ${idx + 1}`}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const copies = [...QuizInputs];
                copies[groupkey].choice[idx] = e.target.value;
                setQuizinputs(copies);
              }}
            />
          ))
        : quizInputs.choice.map((input, idx) => (
            <input
              key={idx}
              type="text"
              required
              value={input.proposition}
              placeholder={`Proposition ${idx + 1}`}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const copies = [...QuizInputs];
                (copies[groupkey].choice as Multiple[])[idx].proposition = e.target.value;
                setQuizinputs(copies);
              }}
            />
          ))}

      <AddAndRemoveBtn
        setQuizinputs={setQuizinputs}
        quizInputs={quizInputs}
        groupkey={groupkey}
        QuizInputs={QuizInputs}
      />
    </div>
  );
};

export default Proposition;
