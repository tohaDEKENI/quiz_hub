import { Multiple, QuizInput } from "@/lib/type";
import { useState } from "react";
import { useRef } from "react";
import { SetStateAction } from "react";
import { SendComponent } from "./SendComponent";

type Props = {
    QuizInputs: QuizInput[],
    setTitle: React.Dispatch<SetStateAction<string>>,
    title: string,
    description: string,
    setDescription: React.Dispatch<SetStateAction<string>>
    setVisibility: React.Dispatch<SetStateAction<string>>,
    visibility: string,
    setCategory: React.Dispatch<SetStateAction<string>>;
    setDificult: React.Dispatch<SetStateAction<string>>;
    category: string;
    dificult: string
}

const SendSaveBtn = ({ QuizInputs, title, setTitle, description, setDescription, setVisibility, visibility, category, dificult, setCategory, setDificult }: Props) => {
    const ref = useRef<HTMLDialogElement>(null)
    const [type, setType] = useState<string>(''); // Titre de la modale
    const [message, setMessage] = useState<string>(''); // Message de la modale
    const [valid, setValid] = useState<boolean>(false)

    const handleSend = () => {
        if (QuizInputs.length === 0) {
            setType("Aucune question ajoutée");
            setMessage("Veuillez ajouter au moins une question avant de continuer.");
            ref.current?.showModal();
            return;
        }
        for (let i = 0; i < QuizInputs.length; i++) {
            const quiz = QuizInputs[i];

            if (quiz.title.trim() === "") {
                setType("Question vide");
                setMessage(`La question ${i + 1} est vide. Veuillez entrer l'intitulé.`);
                ref.current?.showModal();
                return;
            }

            for (let j = 0; j < quiz.choice.length; j++) {
                const choice = quiz.choice[j];

                if (quiz.type === "unique" && typeof choice === "string") {
                    if (choice.trim() === "") {
                        setType("Proposition vide");
                        setMessage(`La proposition ${j + 1} de la question "${quiz.title}" est vide.`);
                        ref.current?.showModal();
                        return;
                    }
                }

                if (quiz.type === "multiple" && typeof choice === "object") {
                    if (choice.proposition.trim() === "") {
                        setType("Proposition vide");
                        setMessage(`La proposition ${j + 1} de la question "${quiz.title}" est vide.`);
                        ref.current?.showModal();
                        return;
                    }
                }
            }

            if (quiz.type === "unique") {
                if (quiz.trueResponse.trim() === "") {
                    setType("Bonne réponse manquante");
                    setMessage(`Veuillez indiquer la bonne réponse pour la question ${i + 1}.`);
                    ref.current?.showModal();
                    return;
                }
            }
        }
        setValid(true)
    };


    return (
        <div className="flex justify-end gap-4 p-4">
            <button className="btn btn-primary" onClick={handleSend}>Cree votre quiz</button>
            <button className="btn btn-primary">Brouillon</button>

            <dialog ref={ref} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{type}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setMessage('')}>Corriger</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <SendComponent QuizInputs={QuizInputs} title={title} setTitle={setTitle} description={description} setDescription={setDescription} valid={valid} setValid={setValid}
                setVisibility={setVisibility} visibility={visibility}
                setCategory={setCategory} setDificult={setDificult}
                dificult={dificult} category={category} />
        </div>
    );
}

export default SendSaveBtn;