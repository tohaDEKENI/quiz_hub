'use client'

import { Multiple, QuizInput } from "@/lib/type";
import { SetStateAction } from "react";

type Props = {
  QuizInputs: QuizInput[];
  quizInputs: QuizInput;
  setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>;
  groupkey: number;
};

const TrueResponse = ({ quizInputs, QuizInputs, setQuizinputs, groupkey }: Props) => {
  return (
    <div className="space-y-2 mt-2">
      {quizInputs.type === "unique" ? (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-600">Choisir la bonne proposition</p>
          <select
            defaultValue="Bonne reponse"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const copies = [...QuizInputs];
              (copies[groupkey] as { trueResponse: string }).trueResponse = e.target.value;
              setQuizinputs(copies);
            }}
          >
            <option disabled={true}>Bonne réponse</option>
            {quizInputs.choice.map((opt, k) => (
              <option key={k} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-600">Choisir les bonnes propositions</p>
          <div className="grid grid-cols-2 gap-2">
            {quizInputs.choice.map((check, k) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-400 text-blue-500 focus:ring-1 focus:ring-blue-300"
                  checked={check.isChecked}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const copies = [...QuizInputs];
                    (copies[groupkey].choice[k] as Multiple).isChecked = e.target.checked;
                    setQuizinputs(copies);
                  }}
                />
                <span className="text-sm text-gray-700 truncate" title={check.proposition}>
                  {check.proposition || `Proposition ${k + 1}`}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrueResponse;
