'use client';

import { useState, useEffect, SetStateAction } from "react";
import { authClient } from "@/lib/auth-client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AddAndRemoveBtn from "./AddCommentsBtn"
import { Comment } from "@/lib/type";
interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}

type Props = {
    comment: string,
    setComments: React.Dispatch<SetStateAction<string>>,
    quiz_id?:string,
    setCommentsGet:React.Dispatch<SetStateAction<Comment[]>>
}

const CommentsTextArea = ({ comment, setComments ,quiz_id ,setCommentsGet}: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [onFocus, setOnfocus] = useState<boolean>(false)

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const session = await authClient.getSession();

                if (session?.data?.user) {
                    const { id, name, email, image } = session.data.user;
                    setUser({ id, name, email, image: image as string });
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Erreur récupération utilisateur :", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return (
        <div className="w-full space-y-2">
            <div className="flex items-start gap-4">
                {user?.image && (
                    <img
                        src={user.image}
                        alt={user.name || "Avatar"}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                )}

                <Textarea
                    value={comment}
                    className="border border-gray-200 w-full"
                    placeholder="Ajouter un commentaire..."
                    onFocus={() => setOnfocus(true)}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)}
                />
            </div>
            {onFocus && <div className="flex justify-end space-x-4 text-white ">
                <Button
                    className="cursor-pointer"
                    onClick={() => setOnfocus(false)}

                >Annuler</Button>
                <AddAndRemoveBtn comment={comment} user_id={user?.id} quiz_id={quiz_id} user_image={user?.image} user_name={user?.name} setComments={setComments} setCommentsGet={setCommentsGet}/>

            </div>}
        </div>
    );
};

export default CommentsTextArea;
