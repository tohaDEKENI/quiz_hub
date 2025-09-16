'use client';

import { useEffect, useState } from "react";
import { Quiz, Comment } from "@/lib/type";
import Description from "./quizDetails/Description";
import QuizTitle from "./quizDetails/Title";
import ShowQuiz from "./quizDetails/ShowQuiz";
import CommentsTextArea from "./comments/CommentsTextarea";
import GetComments from "./comments/GetComments";

type Props = {
    id: string;
};

const ResolveQuiz = ({ id }: Props) => {
    const [quiz, setQuiz] = useState<Quiz>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [comment, setComments] = useState<string>("")
    const [comments, setCommentsGet] = useState<Comment[]>([]);

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
            } catch (err) {
                setError("Impossible de charger le quiz.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    return (
        <div className="w-full space-y-2">
            <div className="p-1 border border-gray-200 h-[600px] rounded-md flex items-center justify-center w-full bg-base-200  md:p-2"
                style={{
                    backgroundImage: "url('/quiz_bg.png')",
                    backgroundSize: "cover",
                }}
            >
                <ShowQuiz quiz={quiz} />
            </div>

            <>
                <QuizTitle title={quiz?.title} isLoading={loading} />
                <Description quiz={quiz} />
                <CommentsTextArea comment={comment} setComments={setComments} quiz_id={quiz?.id} setCommentsGet={setCommentsGet} />
                <GetComments comments={comments} setCommentsGet={setCommentsGet} quiz_id={quiz?.id} />
            </>

        </div>
    );
};

export default ResolveQuiz;
