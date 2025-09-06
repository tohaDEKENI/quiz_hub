'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SetStateAction } from "react";
import { Comment } from "@/lib/type";

type Props = {
    comment: string,
    quiz_id?: string,
    user_id?: string,
    user_name?: string,
    user_image?: string,
    setComments: React.Dispatch<SetStateAction<string>>,
    setCommentsGet:React.Dispatch<SetStateAction<Comment[]>>,
}

const AddComment = ({ comment, quiz_id, user_image, user_name, setComments,setCommentsGet }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const handleAddComment = async () => {
        setLoading(true)
        try {

            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment, quiz_id, user_image, user_name })
            })
            const data = await res.json()

            if(res.ok){
                fetch("/api/comments/"+quiz_id)
                    .then(res => res.json())
                    .then(data => {
                         setComments("")
                        setCommentsGet(data)
                    })
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <Button
            disabled={comment.trim() === ""}
            className="cursor-pointer bg-blue-500"
            onClick={handleAddComment}
        >{loading ? <span className="loading loading-spinner loading-md"></span> : "Commenter"}</Button>
    );
}

export default AddComment;