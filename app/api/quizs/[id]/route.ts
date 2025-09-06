import { connexion } from "@/lib/connexion"
import { NextResponse } from "next/server"

export async function GET(req:Request,context:{params:Promise<{id:string}>}) {
    try {
        const {id} = await context.params
        const [data] = await connexion.execute("SELECT * FROM quiz WHERE id = ? ",[id])

        return NextResponse.json(data)
        
    } catch (error) {
        
    }
}