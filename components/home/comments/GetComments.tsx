'use client'
import { SetStateAction, useEffect, useState } from "react";
import { Comment } from "@/lib/type";

type Props = {
    comments: Comment[],
    setCommentsGet: React.Dispatch<SetStateAction<Comment[]>>,
    quiz_id?: string
}

const GetComments = ({ comments, setCommentsGet, quiz_id }: Props) => {
    useEffect(() => {
        async function handleGetComment() {
            try {
                const res = await fetch(`/api/comments/${quiz_id}`)
                const data = await res.json();
                setCommentsGet(data)
            } catch {
                alert("Echouer commente")
            }
        }
        handleGetComment()
    }, [quiz_id])

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

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">
                Commentaires ({comments.length ? comments.length : "0"})
            </h2>
            <div className="space-y-4 bg-base-200 p-4">
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <img
                            src={comment.user_image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-sm">
                            <p className="font-medium text-gray-800">{comment.user_name}</p>
                            <p className="text-gray-700">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{timeSince(comment.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default GetComments;