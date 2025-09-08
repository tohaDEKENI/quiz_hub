'use client'

import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import { CheckSquare } from 'lucide-react';

type Props = {
  quizInputs: QuizInput[],
  setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>
}

const MultipleCreateButton = ({ quizInputs, setQuizinputs }: Props) => {
  return (
    <div className="pt-2">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
        onClick={() => {
          setQuizinputs(prev => [
            ...prev,
            {
              title: '',
              choice: [
                { proposition: '', isChecked: false },
                { proposition: '', isChecked: false }
              ],
              type: 'multiple'
            }
          ])
        }}
      >
        <CheckSquare className="w-4 h-4" />
        Choix multiple
      </button>
    </div>
  );
}

export default MultipleCreateButton;
