import { connexion } from "@/lib/connexion";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { title, description, data, visibility } = await req.json();

        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
        }

        const quizId = uuidv4();

        await connexion.execute(
            "INSERT INTO quiz (id, title, description, data, visibility, user_id, createAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
            [quizId, title, description, JSON.stringify(data), visibility, session.user.id]
        );


        return NextResponse.json({
            message: "Quiz créé avec succès",
            id: quizId,
        });
    } catch (error) {
        console.error("Erreur lors de la création du quiz :", error);

        return NextResponse.json(
            { error: "Erreur serveur lors de la création du quiz" },
            { status: 500 }
        );
    }
}
 


export async function GET(req:Request) {
    try {
        const [data] = await connexion.execute("SELECT  * FROM quiz WHERE visibility = 'public' ")
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({message:"Erreur cote serveur"})
    }
}