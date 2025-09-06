'use client';
import React, { SetStateAction, useEffect, useState } from 'react';
import QuizCard from './Quiz';
import { Quiz } from '@/lib/type';
import Skeleton from './Skeleton';

type Props = {
    quizs: Quiz[],
    setQuizs: React.Dispatch<SetStateAction<Quiz[]>>
}

export default function QuizList({ quizs, setQuizs }: Props) {
    const [isLoading, setIsloading] = useState<boolean>(false);

    useEffect(() => {
        async function get_quizs() {
            setIsloading(true)
            try {
                const res = await fetch("/api/quizs")
                const data = await res.json()
                const parsedQuizs = data.map((quiz: any) => ({
                    ...quiz,
                    data: JSON.parse(quiz.data),
                }));
                setQuizs(parsedQuizs);
                setIsloading(false);
            } catch (error) {

            } finally {
                setIsloading(false)
            }
        }
        get_quizs()
    }, []);

    const liste = Array.from({ length: 30 })

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
