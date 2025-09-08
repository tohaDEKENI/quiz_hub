'use client';
import React, { SetStateAction, useEffect, useState } from 'react';
import QuizCard from './Quiz';
import { Quiz } from '@/lib/type';
import Skeleton from './Skeleton';
import { AlertCircle } from "lucide-react"; // icône lucide


type Props = {
    quizs: Quiz[],
    setQuizs: React.Dispatch<SetStateAction<Quiz[]>>
}

export default function QuizList({ quizs, setQuizs }: Props) {
    const [isLoading, setIsloading] = useState<boolean>(false);

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


    const liste = Array.from({ length: 30 })
    if (quizs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 w-full" >
                <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />
                <p className="text-lg font-medium">Aucun résultat</p>
                <p className="text-sm text-gray-400">
                    Essayez une autre catégorie ou mot-clé
                </p>
            </div>
        );
    }

    return (
        <div className="p-0 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {isLoading ?
                liste.map((skeleton, key) => (
                    <Skeleton key={key} />
                ))
                : quizs.map((quiz, k) => (
                    <QuizCard key={k} quiz={quiz} quizKey={k} />
                ))}
        </div>
    );
}
