"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Quiz } from "@/lib/type";

type Props = {
    setQuizs: React.Dispatch<SetStateAction<Quiz[]>>
}

export default function CategoriesBar({ setQuizs }: Props) {
    const categories = [
        "Tout",
        "Culture générale",
        "Histoire",
        "Géographie",
        "Sciences",
        "Mathématiques",
        "Littérature",
        "Musique",
        "Cinéma",
        "Sport",
        "Technologie",
        "Art",
        "Actualités",
        "autre"
    ];

    const [active, setActive] = useState("Tout");

    useEffect(() => {
        async function get_quizs() {
            try {
                let res;
                if (active === "Tout") {
                    // Récupérer tous les quiz
                    res = await fetch("/api/quizs");
                } else {
                    // Récupérer les quiz filtrés par catégorie
                    res = await fetch("/api/quizs/category?category=" + active);
                }

                const json = await res.json();

                // Si l'API renvoie { data: [...] }, récupérer json.data
                const quizData: Quiz[] = Array.isArray(json) ? json : json.data;

                // Parser le champ data si c'est une string
                const parsedQuizs: Quiz[] = quizData.map((quiz) => ({
                    ...quiz,
                    data: typeof quiz.data === "string" ? JSON.parse(quiz.data) : quiz.data,
                }));

                setQuizs(parsedQuizs);
            } catch (error) {
                console.error("Erreur fetch quizs:", error);
            }
        }

        get_quizs();
    }, [active, setQuizs]);


    return (
        <div className="flex gap-2 overflow-x-scroll p-2 scrollbar-hide">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`btn btn-sm rounded-full ${active === cat ? "btn-neutral" : "btn-outline"}`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
