
import { QuizInput } from "@/lib/type";
import { useState } from "react";

type Props = {
    QuizInputs: QuizInput[],
    title: string,
    description: string,
    visibility: string,
    valid: boolean,
}

export const SendBtn = ({ QuizInputs, title, description, visibility, valid }: Props) => {
    const [isLoading,setIsloading] = useState<boolean>(false)
    const handleSendQuizs = async () => {
        setIsloading(true)
        try {
            if (title === "") {
                alert("titre vide")
                return;
            } else {
                const res = await fetch("/api/quizs", {
                    method: "POST",
                    headers: { 'Content-Type': "applicatio/json" },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        data: QuizInputs,
                        visibility: visibility
                    })
                })
                const data = await res.json()
                alert(data.message)
                console.log(data)
            }
        } catch (error) {

        }finally{
            setIsloading(false)
        }

    }
    return (
        <div>
            <button
                onClick={handleSendQuizs}
                className="btn btn-primary rounded-md"
            >
                {isLoading ? <span className="loading loading-spinner loading-md"></span>: "Envoyer le quiz"}
            </button>
        </div>
    );
}
