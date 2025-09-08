'use client'

import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import { CircleDot } from 'lucide-react';

type Props = {
  quizInputs: QuizInput[],
  setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>
}

const SingleCreateButton = ({ quizInputs, setQuizinputs }: Props) => {
  return (
    <div className="pt-2">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
        onClick={() => {
          setQuizinputs(prev => [
            ...prev,
            {
              title: '',
              choice: ['', ''],
              trueResponse: '',
              type: 'unique'
            }
          ])
        }}
      >
        <CircleDot className="w-4 h-4" />
        Choix unique
      </button>
    </div>
  );
}

export default SingleCreateButton;
