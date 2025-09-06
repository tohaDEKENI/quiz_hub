import React from 'react';
import { Brain } from 'lucide-react';
import { Quiz } from '@/lib/type';
import Link from 'next/link';
type Props = {
    quiz: Quiz,
    quizKey: number
}
export default function QuizCard({ quiz, quizKey }: Props) {

    function timeSince(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const intervals = [
            { label: 'année', seconds: 31536000 },
            { label: 'mois', seconds: 2592000 },
            { label: 'jour', seconds: 86400 },
            { label: 'heure', seconds: 3600 },
            { label: 'minute', seconds: 60 },
        ];

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count > 0) {
                return `Il y a ${count} ${interval.label}${count > 1 ? 's' : ''}`;
            }
        }

        return 'À l\'instant';
    }

    return (
        <Link href={`/quiz/${quiz.id}`}>
            <div className="rounded-lg overflow-hidden shadow-lg bg-base-900 text-white max-w-sm relative font-sans h-full w-full">
                {/* Fond en gradient */}
                <div
                    className="h-36 w-full flex justify-center items-center"
                    style={{
                        background: 'linear-gradient(135deg, #f97316, #8b5cf6)',
                    }}
                >
                    <Brain className="text-pink-400" size={40} />
                </div>

                {/* Badge durée */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs rounded-md px-2 py-1 inline-flex items-center">
                    {Array.isArray(quiz.data) && quiz.data[quizKey]?.choice?.length
                        ? quiz.data[quizKey].choice.length
                        : 0} quizs
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg text-black">
                        {quiz.title}
                    </h3>
                    <p className="text-gray-400 text-sm my-1">
                        QuizMaster &middot; {timeSince(quiz.createAt)}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-300">
                        <span>👥 {quiz.vues} participants</span>
                        <span className="bg-red-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                            DIFFICILE
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
