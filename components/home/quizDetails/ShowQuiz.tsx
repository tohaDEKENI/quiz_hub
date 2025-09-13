
import { Quiz, Multiple } from "@/lib/type";
import { useEffect, useState } from "react";
import ResultDialog from "./ResultDialog";

// Skeleton stylisé
const QuizSkeleton = () => {
    return (
        <div className="space-y-6 bg-white p-6 rounded shadow max-w-3xl mx-auto animate-pulse w-full">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>

            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="h-10 bg-gray-200 rounded w-full"></div>
                ))}
            </div>

            <div className="h-10 bg-gray-300 rounded w-32 mt-6"></div>
        </div>
    );
};

type Props = {
    quiz?: Quiz;
};

const ShowQuiz = ({ quiz }: Props) => {
    const [visibleChoices, setVisibleChoices] = useState<(string | Multiple)[]>([]);
    const [commpteur, setCompteur] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [showCorrection, setShowCorrection] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

    const [isFinish, setIsfinish] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0);


    useEffect(() => {
        if (!quiz || !quiz.data[commpteur]) return;

        const currentQuestion = quiz.data[commpteur];
        const choices = currentQuestion.choice;

        // Réinitialisation des états
        setVisibleChoices([]);
        setSelectedAnswers([]);
        setShowCorrection(false);
        setIsCorrect(null);
        setCorrectAnswers([]);

        // Traitement des choix visibles
        if (currentQuestion.type === "unique") {
            if (Array.isArray(choices) && typeof choices[0] === "string") {
                setVisibleChoices(choices as string[]);
            }
        }

        if (currentQuestion.type === "multiple") {
            if (
                Array.isArray(choices) &&
                typeof choices[0] === "object" &&
                "proposition" in choices[0]
            ) {
                setVisibleChoices(choices as Multiple[]);
            }
        }

    }, [quiz, commpteur]);

    // 🔁 Squelette de chargement
    if (!quiz) return <QuizSkeleton />;

    const currentQuestion = quiz.data[commpteur];

    const handleSelect = (value: string) => {
        if (currentQuestion.type === "unique") {
            setSelectedAnswers([value]);
        } else {
            setSelectedAnswers((prev) =>
                prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
            );
        }
    };

    const verifyAnswer = () => {
        if (!quiz) return;

        let correct: string[] = [];

        if (currentQuestion.type === "unique") {
            correct = [currentQuestion.trueResponse as string];
            setCorrectAnswers(correct);
            const isAnswerCorrect = selectedAnswers[0] === correct[0];
            setIsCorrect(isAnswerCorrect);
            if (isAnswerCorrect) setScore(prev => prev + 1);
        }

        if (currentQuestion.type === "multiple") {
            correct = (currentQuestion.choice as Multiple[])
                .filter((c) => c.isChecked)
                .map((c) => c.proposition)
                .sort();

            setCorrectAnswers(correct);

            const selected = [...selectedAnswers].sort();
            const isAnswerCorrect = JSON.stringify(correct) === JSON.stringify(selected);

            setIsCorrect(isAnswerCorrect);
            if (isAnswerCorrect) setScore(prev => prev + 1);
        }

        setShowCorrection(true);

    };

    const goToNext = () => {
        if (commpteur + 1 < quiz!.data.length) {
            setCompteur((prev) => prev + 1);
        }
    };


    return (
        <div className="space-y-6 bg-base-300 p-6 rounded shadow-md max-w-3xl mx-auto w-full">
            {/* Titre de la question */}
            <h2 className="text-2xl font-bold text-gray-800">
                {commpteur + 1}. {currentQuestion.title}
            </h2>

            {/* Affichage des propositions */}
            <div className="space-y-2">
                {visibleChoices.map((choice, index) => {
                    const value = typeof choice === "string" ? choice : choice.proposition;
                    const isChecked = selectedAnswers.includes(value);
                    const isCorrectAnswer = correctAnswers.includes(value);

                    let bgColor = "bg-white border border-gray-300";
                    if (showCorrection) {
                        if (isCorrectAnswer) {
                            bgColor = "bg-green-100 border-green-500";
                        } else if (isChecked && !isCorrectAnswer) {
                            bgColor = "bg-red-100 border-red-500";
                        }
                    }

                    return (
                        <label
                            key={index}
                            className={`flex items-center p-3 rounded cursor-pointer transition-all duration-200 space-x-3 ${bgColor}`}
                        >
                            <input
                                type={currentQuestion.type === "unique" ? "radio" : "checkbox"}
                                name={`input-${commpteur + index * Math.random()*100}`}
                                value={value}
                                checked={isChecked}
                                onChange={() => handleSelect(value)}
                                disabled={showCorrection}
                                className="form-checkbox h-5 w-5 text-blue-600 "
                            />
                            <span className="text-gray-800 text-base">{value}</span>
                        </label>
                    );
                })}
            </div>

            {/* Résultat */}
            {showCorrection && (
                <div
                    className={`text-lg font-semibold px-4 py-2 rounded ${isCorrect ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                        }`}
                >
                    {isCorrect ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}
                    {!isCorrect && correctAnswers.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            Réponses correctes :{" "}
                            <span className="font-medium text-black">
                                {correctAnswers.join(", ")}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Boutons d’action */}
            <div className="flex flex-col md:flex-row justify-end gap-1 mt-4 ">
                {!showCorrection ? (
                    <button
                        onClick={verifyAnswer}
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 cursor-pointer"
                        disabled={selectedAnswers.length === 0}
                    >
                        Vérifier
                    </button>
                ) : (
                    <button
                        onClick={goToNext}
                        className="px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 disabled:bg-gray-400 cursor-pointer"
                        disabled={commpteur + 1 >= quiz.data.length}
                    >
                        Question suivante
                    </button>
                )}
                {/* Bouton Afficher uniquement à la dernière question */}
                {commpteur === quiz.data.length - 1 && showCorrection && (
                    <button className="btn btn-primary rounded" onClick={() => setIsfinish(true)}>
                        Afficher le resultat
                    </button>
                )}

            </div>
            <ResultDialog isFinish={isFinish} setIsfinish={setIsfinish} quiz={quiz} score={score} quiz_lenght={quiz.data.length} />
        </div>
    );
};

export default ShowQuiz;
