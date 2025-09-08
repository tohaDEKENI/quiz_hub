"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}

const CreateBtn = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
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
            }
        }

        fetchUser();
    }, []);

    return (
        <div >
            <Button
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 cursor-pointer text-white"
                onClick={() => {
                    if (!user) {
                        setShowLoginModal(true); // popup connexion
                    } else {
                        router.push("/dashboard/quiz/create"); // redirection normale
                    }
                }}
            >
                <PlusCircle size={20} />
                {/* Texte caché sur sm */}
                <span className="hidden sm:inline">Créer un Quiz</span>
            </Button>



            {/* 🚨 POPUP LOGIN */}
            <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Connexion requise</DialogTitle>
                        <DialogDescription>
                            Vous devez être connecté pour créer un quiz.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowLoginModal(false)}
                            className="cursor-pointer"
                        >
                            Annuler
                        </Button>
                        <Button
                            className="cursor-pointer text-white"
                            onClick={() => {
                                setShowLoginModal(false);
                                router.push("/sign/sign-in"); // redirection login
                            }}
                        >
                            Se connecter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateBtn;
