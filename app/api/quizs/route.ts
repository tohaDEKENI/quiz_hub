import { connexion } from "@/lib/connexion";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/lib/auth";
import { Quiz } from "@/lib/type";

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
 


function shuffleArray(array: Quiz[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function GET(req: Request) {
    try {
        const [data] = await connexion.execute(
            "SELECT * FROM quiz WHERE visibility = 'public'"
        );

        const shuffledData = shuffleArray(data as Quiz[]);
        return NextResponse.json(shuffledData);
    } catch (error) {
        return NextResponse.json({ message: "Erreur côté serveur" });
    }
}