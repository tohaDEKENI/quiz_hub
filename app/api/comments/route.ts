import { connexion } from "@/lib/connexion";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { comment, quiz_id, user_id, user_image, user_name } = await req.json();
        const session = await auth.api.getSession({
            headers: req.headers
        });

        const [result] = await connexion.execute(
            `INSERT INTO comments (content, user_id, quiz_id, user_name, user_image) 
             VALUES (?, ?, ?, ?, ?)`,
            [comment, session?.user.id, quiz_id, user_name, user_image]
        );

        return new Response(
            JSON.stringify({ message: "Commentaire ajouté avec succès" }),
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Erreur lors de l'insertion du commentaire" }), {
            status: 500,
        });
    }
}

