'use client'

import { useState } from "react";
import { useEffect } from "react";
import { Quiz } from "@/lib/type";
import QuizCard from "../Quiz";


const AutherQuiz = () => {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [quizs, setQuizs] = useState<Quiz[]>([]);
    useEffect(() => {
        async function get_quizs() {
            setIsloading(true);
            try {
                const res = await fetch("/api/quizs");
                // On précise que c'est un tableau de Quiz
                const data: Quiz[] = await res.json();

                // Si la propriété `data` est une string JSON, on la parse
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
    }, [setQuizs]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {
                quizs.map((quiz, key) => (
                    <QuizCard quiz={quiz} quizKey={key} />
                ))
            }

        </div>
    );
}

export default AutherQuiz;