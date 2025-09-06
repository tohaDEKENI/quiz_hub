import { SetStateAction, useEffect, useRef } from "react";
import { Multiple, Quiz } from "@/lib/type";

type Props = {
  isFinish: boolean;
  setIsfinish: React.Dispatch<SetStateAction<boolean>>;
  quiz: Quiz;
  score: number;
  quiz_lenght: number;
};

const ResultDialog = ({ isFinish, setIsfinish, quiz, score, quiz_lenght }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isFinish) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isFinish]);

  const handleClose = () => {
    setIsfinish(false);
  };

  const getCorrectAnswers = (question: Quiz["data"][0]): string[] => {
    if (question.type === "unique") {
      return [question.trueResponse as string];
    }
    if (question.type === "multiple") {
      return (question.choice as Multiple[])
        .filter((c) => c.isChecked)
        .map((c) => c.proposition);
    }
    return [];
  };

  const getAllChoices = (question: Quiz["data"][0]): string[] => {
    if (question.type === "unique") {
      return question.choice as string[];
    }
    if (question.type === "multiple") {
      return (question.choice as Multiple[]).map((c) => c.proposition);
    }
    return [];
  };

  const percentage = Math.round((score / quiz_lenght) * 100);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">🎉 Résultat du Quiz</h3>

        {/* SCORE & POURCENTAGE */}
        <div className="flex flex-col sm:flex-row items-center justify-around mb-6 gap-4">
          <div
            className="radial-progress text-primary"
            style={{ "--value": percentage } as React.CSSProperties}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {percentage}%
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">
              🎯 Score : <span className="text-primary">{score}</span> / {quiz_lenght}
            </p>
            <p className="text-sm text-gray-500">
              Vous avez répondu correctement à {score} question{score > 1 ? "s" : ""} sur {quiz_lenght}.
            </p>
          </div>
        </div>

        {/* LISTE DES QUESTIONS ET RÉPONSES */}
        <p className="mb-4 text-sm text-gray-600">
          Voici les bonnes réponses pour chaque question :
        </p>

        <div className="space-y-6">
          {quiz.data.map((question, index) => {
            const correctAnswers = getCorrectAnswers(question);
            const allChoices = getAllChoices(question);

            return (
              <div key={index}>
                <p className="font-semibold mb-2">
                  {index + 1}. {question.title}
                </p>
                <ul className="ml-4 space-y-1">
                  {allChoices.map((choice, idx) => {
                    const isCorrect = correctAnswers.includes(choice);
                    return (
                      <li
                        key={idx}
                        className={`px-3 py-1 rounded text-sm ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {choice}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* BOUTON DE FERMETURE */}
        <div className="modal-action mt-6">
          <button className="btn" onClick={handleClose}>
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ResultDialog;
