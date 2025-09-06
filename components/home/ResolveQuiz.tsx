'use client';

import { useEffect, useState } from "react";
import { Quiz } from "@/lib/type";
import Description from "./quizDetails/Description";
import QuizTitle from "./quizDetails/Title";
import ShowQuiz from "./quizDetails/ShowQuiz";

type Props = {
    id: string;
};

const ResolveQuiz = ({ id }: Props) => {
    const [quiz, setQuiz] = useState<Quiz>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await fetch(`/api/quizs/${id}`);
                if (!res.ok) {
                    throw new Error("Erreur lors du chargement du quiz");
                }

                const data = await res.json();
                const quizRaw = data[0];
                const parsedQuiz = {
                    ...quizRaw,
                    data: JSON.parse(quizRaw.data),
                };

                setQuiz(parsedQuiz);
            } catch (err: any) {
                console.error(err);
                setError("Impossible de charger le quiz.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    return (
        <div className="w-full space-y-2">
            <div className="p-1 border border-gray-200 rounded-md flex items-center justify-center w-full bg-base-200 h-full md:p-2">
                <ShowQuiz quiz={quiz} />
            </div>

            <>
                <QuizTitle title={quiz?.title} isLoading={loading} />
                <Description quiz={quiz} />
            </>

        </div>
    );
};

export default ResolveQuiz;
