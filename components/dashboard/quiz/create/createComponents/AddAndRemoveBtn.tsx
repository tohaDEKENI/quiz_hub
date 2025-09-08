'use client'

import { QuizInput } from "@/lib/type";
import { Multiple } from "@/lib/type";
import { SetStateAction, useRef, useState } from "react";
import { Plus, Minus, Trash } from 'lucide-react';

type Props = {
    quizInputs: QuizInput;
    QuizInputs: QuizInput[];
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>;
    groupkey: number;
};

const AddAndRemoveBtn = ({ quizInputs, setQuizinputs, QuizInputs, groupkey }: Props) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [message, setMessage] = useState<string>("");

    const showTempMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 2000); // disparait après 2s
    };

    const addChoice = () => {
        if (QuizInputs[groupkey].choice.length >= 6) {
            showTempMessage("Impossible d'ajouter plus de 6 propositions");
            return;
        }
        const copies = [...QuizInputs];
        if (quizInputs.type === "unique") {
            (copies[groupkey].choice as string[]).push("");
        } else {
            (copies[groupkey].choice as Multiple[]).push({ proposition: '', isChecked: false });
        }
        setQuizinputs(copies);
    };

    const removeChoice = () => {
        if (QuizInputs[groupkey].choice.length <= 2) {
            showTempMessage("Il doit rester au moins 2 propositions");
            return;
        }
        const copies = [...QuizInputs];
        if (quizInputs.type === "unique") {
            (copies[groupkey].choice as string[]).pop();
        } else {
            (copies[groupkey].choice as Multiple[]).pop();
        }
        setQuizinputs(copies);
    };

    const deleteGroup = () => {
        const copies = [...QuizInputs];
        copies.splice(groupkey, 1);
        setQuizinputs(copies);
        modalRef.current?.close();
    };

    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-wrap items-center gap-3">
                <button
                    onClick={addChoice}
                    className="flex items-center justify-center w-10 h-10 bg-green-200 text-green-700 rounded-lg hover:bg-green-300 transition"
                >
                    <Plus size={18} />
                </button>

                <button
                    onClick={removeChoice}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                    <Minus size={18} />
                </button>

                <button
                    onClick={() => modalRef.current?.showModal()}
                    className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                    <Trash size={18} /> Supprimer
                </button>
            </div>

            {/* Message temporaire */}
            {message && <p className="text-sm text-red-500">{message}</p>}

            {/* Modal de confirmation */}
            <dialog ref={modalRef} className="rounded-lg p-6 bg-white shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-3">Confirmation</h3>
                <p className="text-gray-600 mb-5">Voulez-vous vraiment supprimer cet élément ?</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={deleteGroup}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Supprimer
                    </button>
                    <button
                        onClick={() => modalRef.current?.close()}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                    >
                        Annuler
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export default AddAndRemoveBtn;
