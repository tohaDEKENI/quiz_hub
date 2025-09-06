'use client'
import { QuizInput } from "@/lib/type";
import { Multiple } from "@/lib/type";
import { SetStateAction } from "react";
import { useRef } from "react";
import {Plus,Minus,Trash } from 'lucide-react'
type Props = {
    quizInputs: QuizInput,
    QuizInputs: QuizInput[],
    setQuizinputs: React.Dispatch<SetStateAction<QuizInput[]>>,
    groupkey: number,
}

const AddAndRemoveBtn = ({ quizInputs, setQuizinputs, QuizInputs, groupkey }: Props) => {
    const modalref = useRef<HTMLDialogElement>(null)

    const openModal = () => {
        if (modalref.current) {
            modalref.current.showModal()
        }
    }
    return (
        <div className="flex ">
            {
                quizInputs.type === "unique" ?
                    <div className="">

                        {<button disabled={QuizInputs[groupkey].choice.length >= 6} className="btn bg-green-500 text-white rounded-md"
                            onClick={() => {
                                const copies = [...QuizInputs];
                                (copies[groupkey].choice as string[]).push("");
                                setQuizinputs(copies)
                            }}
                        ><Plus className="w-4 h-4"/></button>}

                        {<button disabled={QuizInputs[groupkey].choice.length <=2} className="btn bg-slate-500 text-white rounded-md"
                            onClick={() => {
                                const copies = [...QuizInputs];
                                (copies[groupkey].choice as string[]).pop();
                                setQuizinputs(copies)
                            }}
                        ><Minus className="w-4 h-4"/></button>}
                    </div>
                    :
                    <div>
                         {<button  disabled={QuizInputs[groupkey].choice.length >= 6} className="btn bg-green-500 text-white rounded-md"
                            onClick={() => {
                                const copies = [...QuizInputs];
                                (copies[groupkey].choice as Multiple[]).push({ proposition: '', isChecked: false })
                                setQuizinputs(copies)
                            }}
                        ><Plus className="w-4 h-4"/> </button>}
                         {<button disabled={QuizInputs[groupkey].choice.length <=2} className="btn bg-slate-500 text-white rounded-md"
                            onClick={() => {
                                const copies = [...QuizInputs];
                                (copies[groupkey].choice as Multiple[]).pop();
                                setQuizinputs(copies)
                            }}
                        ><Minus className="w-4 h-4 "/></button>}
                    </div>
            }

            <button className="btn bg-red-400 text-white rounded-md" onClick={openModal}>
                <Trash className="w-4 h-4 mr-2" />Supprimer
            </button>

            <dialog id="my_modal_1" className="modal" ref={modalref}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Confirmation</h3>

                    <p className="mb-6 text-gray-700">Voulez-vous vraiment supprimer cet élément ?</p>
                    <div className="flex justify-end gap-4">
                        <button
                            className="btn bg-red-500 text-white hover:bg-red-600 rounded-md"
                            onClick={() => {
                                const copies = [...QuizInputs];
                                copies.splice(groupkey, 1);
                                setQuizinputs(copies);
                                modalref.current?.close(); // fermer la modale
                            }}
                        >
                            Supprimer
                        </button>
                        <form method="dialog">
                            <button className="btn btn-outline rounded-md">Annuler</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
}

export default AddAndRemoveBtn;