'use client'
import React, { useEffect, useRef } from "react";
import { QuizInput } from "@/lib/type";
import { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendBtn } from "./SendBtn";

type Props = {
    QuizInputs: QuizInput[],
    setTitle: React.Dispatch<SetStateAction<string>>,
    title: string,
    description: string,
    setDescription: React.Dispatch<SetStateAction<string>>
    valid: boolean,
    setValid: React.Dispatch<SetStateAction<boolean>>
    setVisibility: React.Dispatch<SetStateAction<string>>,
    visibility: string
    setCategory: React.Dispatch<SetStateAction<string>>;
    setDificult: React.Dispatch<SetStateAction<string>>;
    category: string;
    dificult: string
}

export const SendComponent = ({ setValid, valid, description, setDescription, title, setTitle, visibility, setVisibility, QuizInputs, category, dificult, setCategory, setDificult }: Props) => {
    const Sendref = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        if (Sendref.current && valid) {
            Sendref.current?.showModal()
        }
    }, [valid])

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
        "sport",
        "Technologie",
        "Art",
        "Actualités",
        "autre"
    ];

    return (
        <div>
            {valid && (
                <dialog ref={Sendref} className="modal ">
                    <div className="modal-box space-y-5">
                        <h3 className="text-2xl font-semibold text-center">🎉 Quiz prêt à être envoyé</h3>

                        <div className="space-y-4">
                            <Input
                                placeholder="Titre de votre quiz"
                                className="w-full h-12"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            />
                            <Textarea
                                placeholder="Description (facultatif)"
                                className="w-full  h-96"
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}

                            />
                            <div className="space-y-2">
                                <p className="font-light italic text-xs text-gray-500">
                                    Public : tout le monde peut le voir. Privé : uniquement vous ou vos invités.
                                </p>
                                <div className="flex space-x-4">
                                    <div className="inline-flex items-center space-x-2">
                                        <input
                                            name="profile"
                                            type="radio"
                                            className="radio border"
                                            value="public"
                                            defaultChecked

                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVisibility(e.target.value)}
                                        />
                                        <span className="text-sm font-medium text-gray-800">
                                            Public
                                            <span className="ml-1 text-xs font-light italic text-gray-500">
                                                (défaut)
                                            </span>
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center space-x-2">
                                        <input
                                            name="profile"
                                            type="radio"
                                            className="radio border"
                                            value="prive"

                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVisibility(e.target.value)}
                                        />
                                        <span className="text-sm font-medium text-gray-800">Privé</span>
                                    </div>
                                </div>
                            </div>

                            <select
                                value={dificult}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDificult(e.target.value)}
                                className="select w-full"
                            >
                                <option disabled value="">
                                    Difficulté
                                </option>
                                <option value="Facile">Facile</option>
                                <option value="Moyen">Moyen</option>
                                <option value="Difficile">Difficile</option>
                            </select>

                            <select
                                value={category}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                                className="select w-full"
                            >
                                <option disabled value="">
                                    Catégorie
                                </option>
                                {categories.map((cat, k) => (
                                    <option key={k} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="modal-action flex justify-between mt-6">
                            <form method="dialog">
                                <button
                                    className="btn rounded-md "
                                    onClick={() => {
                                        setValid(false);
                                        setTitle("");
                                        setDescription("")
                                    }}
                                >
                                    ← Corriger
                                </button>
                            </form>

                            <SendBtn title={title} description={description} visibility={visibility} QuizInputs={QuizInputs} valid={valid} dificult={dificult} category={category} />
                            <button className="btn" onClick={() => console.log(category,dificult)}>VOir</button>

                        </div>
                    </div>
                </dialog>
            )}

        </div>
    );
}