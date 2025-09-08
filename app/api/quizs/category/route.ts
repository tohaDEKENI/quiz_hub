import { NextResponse } from "next/server";
import { connexion } from "@/lib/connexion";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        if (!category) {
            // Si aucune catégorie n'est fournie, on peut renvoyer tous les quiz publics
            const [allData] = await connexion.execute(
                "SELECT * FROM quiz WHERE visibility = 'public'"
            );
            return NextResponse.json({ data: allData });
        }

        const [data] = await connexion.execute(
            "SELECT * FROM quiz WHERE visibility = 'public' AND category = ?",
            [category]
        );

        return NextResponse.json({ data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
    }
}
