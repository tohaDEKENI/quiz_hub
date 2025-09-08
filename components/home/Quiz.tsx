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

    // Génère deux couleurs aléatoires
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    async function vueIncrement(id: string) {
        try {
            const res = await fetch("/api/quizs/updateVue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error("Erreur lors de l'incrémentation des vues");
            }

            const data = await res.json();
            console.log("Vues mises à jour :", data.vues);
            return data.vues;
        } catch (error) {
            console.error("Erreur dans vueIncrement :", error);
            return null;
        }
    }

    return (
        <Link href={`/quiz/${quiz.id}`} onClick={() => vueIncrement(quiz.id)}>
            <div className="rounded-lg overflow-hidden shadow-lg bg-base-900 text-white max-w-sm relative font-sans h-full w-full">
                {/* Fond en gradient */}
                <div
                    className="h-20 w-full flex justify-center items-center"
                    style={{
                        background: `linear-gradient(135deg, ${color1}, ${color2})`,
                    }}
                >
                    <div className="logo-icon p-2">Q</div>
                </div>

                {/* Badge durée */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs rounded-md px-2 py-1 inline-flex items-center">
                    {Array.isArray(quiz.data) ? quiz.data.length : 0} quizs
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg text-black">
                        {quiz.title}
                    </h3>
                    <p className="text-gray-400 text-sm my-1">
                        <span className='font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600'>
                            QuizHub
                        </span> &middot; {timeSince(quiz.createAt)}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-00">
                        <span className='text-gray-400'>👥 {quiz.vues} vue{quiz.vues > 1 ? 's' : ''}</span>
                        <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${quiz.dificult === "Facile"
                                ? "bg-green-500"
                                : quiz.dificult === "Moyen"
                                    ? "bg-yellow-500"
                                    : quiz.dificult === "Difficile"
                                        ? "bg-red-600"
                                        : "bg-gray-400" // couleur par défaut si valeur inconnue
                                }`}
                        >
                            {quiz.dificult}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ---- Fonction utilitaire ----
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
