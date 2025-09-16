'use client'
import { useState, useEffect } from "react";
import { Quiz } from "@/lib/type";
import ShowQuiz from "@/components/home/quizDetails/ShowQuiz";


const QuizExplore = () => {
    const [quizs, setQuizs] = useState<Quiz[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        async function get_quizs() {
            setIsloading(true);
            try {
                const res = await fetch("/api/quizs");
                const data: Quiz[] = await res.json();

                const parsedQuizs: Quiz[] = data.map((quiz) => ({
                    ...quiz,
                    data: typeof quiz.data === 'string' ? JSON.parse(quiz.data) : quiz.data,
                }));

                setQuizs(parsedQuizs);
            } catch (error) {
                console.error("Erreur fetch quizs:", error);
            } finally {
                setIsloading(false);
            }
        }
        get_quizs();
    }, []);

    return (
        <div className="h-full flex items-center justify-center  mx-4 "
            style={{
                backgroundImage: "url('/bg_explorer.png')",
                backgroundSize: "cover",
            }}
        >
            {/* 🔽 Message d'indication de scroll */}
            {showHint && (
                <div className="absolute top-10 flex flex-col items-center animate-bounce text-gray-700">
                    <span className="font-semibold text-lg">Scroll to explore quizzes</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mt-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <button
                        onClick={() => setShowHint(false)}
                        className="mt-3 px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-900"
                    >
                        Got it
                    </button>
                </div>
            )}

            {/* Carrousel */}
            <div className="carousel carousel-vertical rounded-box h-[600px] w-[700px] shadow-xl bg-black/20 backdrop-blur-sm  mx-2"
             
            >
                {quizs.map((quiz, index) => (
                    <div className="carousel-item h-full flex flex-col m-4" key={quiz.id ?? index}>
                        <p className="text-xl md:text-4xl font-extrabold text-center text-black drop-shadow-lg mt-6 mb-8">
                            {quiz.title}
                        </p>
                        <ShowQuiz quiz={quiz} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizExplore;
