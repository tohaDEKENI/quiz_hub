import { connexion } from "@/lib/connexion";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        })

        const [data] = await connexion.execute("SELECT * FROM quiz WHERE user_id = ? "
            , [session?.user.id])

        return NextResponse.json({data})
    } catch (error) {
        return NextResponse.json({message:"Erreur "})
    }
}