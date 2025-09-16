'use client'
import Title from "@/components/dashboard/title";
import { QuizInput } from "@/lib/type";
import { useEffect, useState } from "react";
import CreateForm from "@/components/dashboard/quiz/create/createForms";
import SingleCeateButton from "@/components/dashboard/quiz/create/SingleCeateButton";
import MultipleCreateButton from "@/components/dashboard/quiz/create/MultipleCreateButton";
import SendSaveBtn from "@/components/dashboard/quiz/create/createComponents/Verify";

const Create = () => {
    const [quizInputs, setQuizinputs] = useState<QuizInput[]>([{ title: '', choice: ['', ''], trueResponse: '', type: 'unique' }])
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>('')
    const [visibility, setVisibility] = useState<string>("public");
    const [dificult, setDificult] = useState<string>("moyen");
    const [category, setCategory] = useState<string>("")

    return (
        <div className="">
            <Title>Cree un quiz</Title>
            <div className="flex space-x-4 mb-3">
                <SingleCeateButton quizInputs={quizInputs} setQuizinputs={setQuizinputs} />
                <MultipleCreateButton quizInputs={quizInputs} setQuizinputs={setQuizinputs} />
            </div>
            <CreateForm QuizInputs={quizInputs} setQuizinputs={setQuizinputs} />
            <SendSaveBtn
                QuizInputs={quizInputs}
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                visibility={visibility} setVisibility={setVisibility}
                setCategory={setCategory} setDificult={setDificult}
                dificult={dificult} category={category}
            />
        </div>
    );
}

export default Create;