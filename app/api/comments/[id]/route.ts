import { connexion } from "@/lib/connexion";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params

        const [rows] = await connexion.execute(
            `SELECT id, content, user_id, quiz_id, user_name, user_image, likes, createdAt, updatedAt 
             FROM comments 
             WHERE quiz_id = ?
             ORDER BY createdAt DESC`,
            [id]
        );

        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Erreur lors de la récupération des commentaires" }), {
            status: 500,
        });
    }
}

