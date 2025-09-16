
import { QuizInput } from "@/lib/type";
import { useState } from "react";

type Props = {
    QuizInputs: QuizInput[],
    title: string,
    description: string,
    visibility: string,
    valid: boolean,
    category: string;
    dificult: string
}

export const SendBtn = ({ QuizInputs, title, description, visibility, valid, category, dificult }: Props) => {
    const [isLoading, setIsloading] = useState<boolean>(false)
    const handleSendQuizs = async () => {
        setIsloading(true)
        try {
            if (title.trim() === "") {
                alert("Le titre est vide !");
                return;
            }

            if (visibility.trim() === "") {
                alert("La visibilité est vide !");
                return;
            }

            if (category.trim() === "") {
                alert("La catégorie est vide !");
                return;
            }

            const res = await fetch("/api/quizs", {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    data: QuizInputs,
                    visibility,
                    category,
                    dificult: dificult, // ⚠️ orthographe "difficulty" ?
                }),
            });

            const data = await res.json();
            alert(data.message);
            console.log(data);

        } catch (error) {
            console.error("Erreur lors de la création du quiz :", error);
            alert("Une erreur est survenue.");
        } finally {
            setIsloading(false);
        }


    }
    return (
        <div>
            <button
                onClick={handleSendQuizs}
                className="btn btn-primary rounded-md"
            >
                {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Envoyer le quiz"}
            </button>
        </div>
    );
}
